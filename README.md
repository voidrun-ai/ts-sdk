# VoidRun TypeScript SDK

A powerful, type-safe SDK for interacting with VoidRun AI Sandboxes. Execute code, manage files, watch file changes, and interact with pseudo-terminals in isolated environments.

[![npm version](https://img.shields.io/npm/v/@voidrun/sdk)](https://www.npmjs.com/package/@voidrun/sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- 🏗️ **Sandbox Management** - Create, list, start, stop, pause, resume, and remove sandboxes
- 🚀 **Code Execution** - Execute commands with real-time streaming output capture
- 📁 **File Operations** - Create, read, delete, compress, and extract files
- 👀 **File Watching** - Monitor file changes in real-time via WebSocket
- 💻 **Pseudo-Terminal (PTY)** - Interactive terminal sessions (ephemeral & persistent)
- 🧠 **Code Interpreter** - Easy multi-language code execution (Python, JavaScript, Bash)
- ⚡ **Background Commands** - Run, list, kill, and attach to background processes
- 🔐 **Type-Safe** - Full TypeScript support with generated types from OpenAPI
- 🎯 **Promise-aokd** - Modern async/await API

## Installation

```bash
npm install @voidrun/sdk
```

Or with yarn:

```bash
yarn add @voidrun/sdk
```

## Quick Start

### Basic Usage

```typescript
import { VoidRun } from "@voidrun/sdk";

// Initialize the SDK with your credentials
const vr = new VoidRun({
  apiKey: "your-api-key-here",
});

// Create a sandbox
const sandbox = await vr.createSandbox({});

// Execute a command
const result = await sandbox.exec({ command: 'echo "Hello from VoidRun"' });
console.log(result.data?.stdout);

// Clean up
await sandbox.remove();
```

## Core Concepts

### Sandboxes

An isolated environment where you can execute code, manage files, and run terminals.

```typescript
// Create a sandbox with options
const sandbox = await vr.createSandbox({
  name: "my-sandbox",       // Optional: Sandbox name
  mem: 1024,                // Memory in MB (optional, has defaults)
  cpu: 1,                   // CPU cores (optional, has defaults)
  templateId: "template-id", // Optional: Template ID
  envVars: {                // Optional: Environment variables
    DEBUG: 'true',
    LOG_LEVEL: 'info'
  }
});

// List all sandboxes
const { sandboxes, meta } = await vr.listSandboxes();
console.log(`Total sandboxes: ${sandboxes.length}`);

// Get a specific sandbox
const existingSandbox = await vr.getSandbox(sandboxId);

// Sandbox lifecycle management
await sandbox.start();    // Start a stopped sandbox
await sandbox.stop();     // Stop a running sandbox
await sandbox.pause();    // Pause a running sandbox
await sandbox.resume();   // Resume a paused sandbox

// Remove a sandbox
await sandbox.remove();
```

### Code Execution

Execute commands and capture output, errors, and exit codes.

#### Synchronous Execution

```typescript
const result = await sandbox.exec({ command: "ls -la /home" });

console.log(result.data?.stdout);   // standard output
console.log(result.data?.stderr);   // standard error
console.log(result.data?.exitCode); // exit code
```

#### Streaming Execution (SSE)

For real-time output, provide streaming handlers:

```typescript
await sandbox.exec({
  command: "seq 1 10 | while read i; do echo \"Line $i\"; sleep 1; done"
}, {
  onStdout: (data) => console.log('stdout:', data),
  onStderr: (data) => console.log('stderr:', data),
  onExit: (result) => console.log('exit:', result),
  onError: (error) => console.error('error:', error),
  signal: abortController.signal // Optional: AbortSignal for cancellation
});
```

#### Execution with Options

```typescript
const result = await sandbox.exec({
  command: "echo $MY_VAR && pwd",
  cwd: "/tmp",                    // Working directory
  env: { MY_VAR: "test_value" },  // Environment variables
  timeout: 30                      // Timeout in seconds
});
```

### Code Interpreter

Execute code in multiple programming languages with a simple, intuitive API.

```typescript
// Execute Python code
const result = await sandbox.runCode('print(2 + 2)', { language: 'python' });
console.log(result.stdout.trim());  // "4"
console.log(result.success);        // true

// Execute JavaScript code
const jsResult = await sandbox.runCode('console.log("Hello")', { language: 'javascript' });

// Execute with streaming output
const streamResult = await sandbox.runCode(`
  for i in range(5):
      print(f"Iteration {i}")
`, {
  language: 'python',
  onStdout: (data) => console.log(data),
  onStderr: (data) => console.error(data),
});

// Check execution result
console.log(streamResult.exitCode);  // 0 for success
console.log(streamResult.results);   // Parsed results
console.log(streamResult.logs);      // { stdout: [...], stderr: [...] }
```

**Supported Languages:** `python`, `javascript`, `typescript`, `node`, `bash`, `sh`

### Background Commands

Run long-running processes in the background and manage them.

```typescript
// Start a background process
const runResult = await sandbox.commands.run(
  "sleep 100 && echo 'Done'",  // command
  { DEBUG: 'true' },           // env (optional)
  "/tmp",                      // cwd (optional)
  0                            // timeout (0 = no timeout)
);
console.log(runResult.pid);     // Process ID

// List all running processes
const listResult = await sandbox.commands.list();
console.log(listResult.processes);  // Array of ProcessInfo

// Attach to a process and stream output
await sandbox.commands.connect(runResult.pid, {
  onStdout: (data) => console.log(data),
  onStderr: (data) => console.error(data),
  onExit: ({ exitCode }) => console.log('Process exited:', exitCode),
});

// Wait for a process to complete
const waitResult = await sandbox.commands.wait(runResult.pid);
console.log(waitResult.exitCode);

// Kill a running process
const killResult = await sandbox.commands.kill(runResult.pid);
console.log(killResult.success);
```

### File Operations

Create, read, update, and manage files in the sandbox.

```typescript
// Create a file
await sandbox.fs.createFile("/tmp/hello.txt");

// Upload content to file
await sandbox.fs.uploadFile("/tmp/hello.txt", "Hello, World!");

// Upload via stream
const stream = Readable.from(["line 1\n", "line 2\n"]);
await sandbox.fs.uploadFileStream("/tmp/streamed.txt", Readable.toWeb(stream));

// Read a file
const buffer = await sandbox.fs.downloadFile("/tmp/hello.txt");
const content = buffer.toString();

// Download as stream
const fileStream = await sandbox.fs.downloadFileStream("/tmp/hello.txt");
const reader = fileStream.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}

// Delete a file
await sandbox.fs.deleteFile("/tmp/hello.txt");

// List directory
const result = await sandbox.fs.listFiles("/tmp");
const files = result.data?.files;

// Get file stats
const stats = await sandbox.fs.statFile("/tmp/hello.txt");

// Create directory
await sandbox.fs.createDirectory("/tmp/mydir");

// Move file
await sandbox.fs.moveFile("/tmp/file.txt", "/tmp/newfile.txt");

// Copy file
await sandbox.fs.copyFile("/tmp/file.txt", "/tmp/copy.txt");

// Change permissions
await sandbox.fs.changePermissions("/tmp/file.txt", "755");

// Head/Tail - read first or last lines
const head = await sandbox.fs.headTail("/tmp/file.txt", { head: true, lines: 10 });
const tail = await sandbox.fs.headTail("/tmp/file.txt", { head: false, lines: 10 });

// Search files by pattern
const search = await sandbox.fs.searchFiles("/tmp", "*.txt");

// Get folder size
const size = await sandbox.fs.folderSize("/tmp");

// Compress files
const archive = await sandbox.fs.compressFile("/tmp", "tar.gz");
console.log(archive.archivePath || archive.data?.archivePath);

// Extract archive
await sandbox.fs.extractArchive("/tmp/archive.tar.gz", "/tmp/extracted");
```

### File Watching

Monitor file changes in real-time.

```typescript
const watcher = await sandbox.fs.watch("/app", {
  recursive: true,
  onEvent: (event) => {
    console.log(`File changed: ${event.path} - ${event.type}`);
  },
  onError: (err) => {
    console.error("Watch error:", err);
  },
  onClose: () => {
    console.log("Watcher closed");
  }
});

// Stop watching
watcher.close();
```

### Pseudo-Terminal (PTY)

Interactive terminal sessions with two modes:

#### Ephemeral Sessions (Temporary)

```typescript
// No session management - temporary shell
const pty = await sandbox.pty.connect({
  onData: (data) => {
    process.stdout.write(data);
  },
  onError: (err) => {
    console.error("PTY error:", err);
  },
});

// Send commands
pty.sendInput('echo "Hello"\n');
pty.sendInput("pwd\n");

// Close connection
pty.close();
```

#### Persistent Sessions

```typescript
// Create a persistent session
const response = await sandbox.pty.createSession();
const sessionId = response.data?.sessionId;

// Connect to the session
const pty = await sandbox.pty.connect({
  sessionId,
  onData: (data) => {
    process.stdout.write(data);
  },
});

// Send commands
pty.sendInput('echo "Hello"\n');

// Close connection (session persists)
pty.close();

// Reconnect later - session and output persist
const reconnected = await sandbox.pty.connect({
  sessionId,
  onData: (data) => {
    process.stdout.write(data); // Includes buffered output
  },
});
```

#### Interactive Commands

Run commands with automatic prompt detection:

```typescript
const pty = await sandbox.pty.connect({ sessionId });

const output = await pty.runCommand("ls -la", {
  timeout: 5000,
  prompt: /[#$] $/, // Regex to detect shell prompt
});

console.log("Output:", output);
```

#### Resize Terminal

```typescript
pty.resize(80, 24); // columns, rows
```

#### Session Management

```typescript
// List all sessions
const sessions = await sandbox.pty.list();

// Delete a session
await sandbox.pty.deleteSession(sessionId);
```

## API Reference

### VoidRun Class

Main client for interacting with the API.

```typescript
new VoidRun(options?: VoidRunConfig)
```

**Options:**

- `apiKey?: string` - API key (defaults to `process.env.VR_API_KEY`)
- `baseUrl?: string` - Base API URL (defaults to `process.env.VR_API_URL`)
- `orgId?: string` - Organization ID (optional)

**Methods:**

- `createSandbox(options: SandboxOptions)` - Create a new sandbox
  - `name?: string` - Sandbox name
  - `templateId?: string` - Template ID
  - `cpu?: number` - CPU cores
  - `mem?: number` - Memory in MB
  - `orgId?: string` - Organization ID
  - `userId?: string` - User ID
  - `sync?: boolean` - Sync mode (default: true)
  - `envVars?: Record<string, string>` - Environment variables
- `listSandboxes()` - List all sandboxes (returns `{ sandboxes: Sandbox[], meta }`)
- `getSandbox(id: string)` - Get a specific sandbox
- `removeSandbox(id: string)` - Delete a sandbox

### Sandbox Class

Represents an isolated sandbox environment.

**Properties:**

- `id: string` - Sandbox ID
- `name: string` - Sandbox name
- `cpu: number` - CPU cores
- `mem: number` - Memory in MB
- `orgId: string` - Organization ID
- `createdAt: Date` - Creation timestamp
- `createdBy: string` - Creator ID
- `status: string` - Sandbox status
- `envVars?: { [key: string]: string }` - Environment variables
- `fs: FS` - File system interface
- `pty: PTY` - PTY interface
- `interpreter: CodeInterpreter` - Code interpreter
- `commands: Commands` - Background commands interface

**Methods:**

- `exec(request: ExecRequest, handlers?: ExecStreamHandlers)` - Execute a command
  - `request.command: string` - Command to execute
  - `request.cwd?: string` - Working directory
  - `request.env?: Record<string, string>` - Environment variables
  - `request.timeout?: number` - Timeout in seconds
  - `handlers.onStdout?: (data: string) => void` - Stream stdout
  - `handlers.onStderr?: (data: string) => void` - Stream stderr
  - `handlers.onExit?: (result: ExecStreamExit) => void` - Exit handler
  - `handlers.onError?: (error: Error) => void` - Error handler
  - `handlers.signal?: AbortSignal` - Abort signal
- `execStream(request: ExecRequest, handlers: ExecStreamHandlers)` - Streaming execution
- `runCode(code: string, options?: CodeExecutionOptions)` - Execute code
- `start()` - Start the sandbox
- `stop()` - Stop the sandbox
- `pause()` - Pause the sandbox
- `resume()` - Resume the sandbox
- `remove()` - Delete the sandbox
- `info()` - Get sandbox information

**Exec Response:**

```typescript
{
  data?: {
    stdout: string;   // standard output
    stderr: string;   // standard error
    exitCode: number; // exit code
  }
}
```

**Code Execution Result:**

```typescript
{
  success: boolean;
  results: any;           // Parsed results
  stdout: string;         // Combined stdout
  stderr: string;         // Combined stderr
  error?: string;         // Error message if any
  exitCode?: number;      // Process exit code
  logs: {
    stdout: string[];     // Individual stdout lines
    stderr: string[];     // Individual stderr lines
  };
}
```

### Commands Class

Background process management.

**Methods:**

- `run(command: string, env?: Record<string, string>, cwd?: string, timeout?: number)` - Start a background process
- `list()` - List all running processes
- `kill(pid: number)` - Kill a process
- `connect(pid: number, handlers: ProcessAttachHandlers)` - Attach to process output stream
- `wait(pid: number)` - Wait for process to complete

### FileSystem Interface

Manage files and directories.

**Methods:**

- `createFile(path: string)` - Create a file
- `uploadFile(path: string, content: string)` - Upload file content
- `uploadFileStream(path: string, stream: ReadableStream)` - Upload file as stream
- `downloadFile(path: string)` - Download file as Buffer
- `downloadFileStream(path: string)` - Download file as ReadableStream
- `deleteFile(path: string)` - Delete a file/directory
- `listFiles(path: string)` - List directory contents
- `statFile(path: string)` - Get file metadata
- `createDirectory(path: string)` - Create a directory
- `compressFile(path: string, format: 'tar' | 'tar.gz' | 'tar.bz2' | 'zip')` - Create archive
- `extractArchive(archivePath: string, destPath?: string)` - Extract archive
- `moveFile(from: string, to: string)` - Move/rename file
- `copyFile(from: string, to: string)` - Copy file
- `changePermissions(path: string, mode: string)` - Change file permissions
- `headTail(path: string, options?: { lines?: number; head?: boolean })` - Read file head/tail
- `searchFiles(path: string, pattern: string)` - Search files by pattern
- `folderSize(path: string)` - Get folder size
- `watch(path: string, options: FileWatchOptions)` - Watch for file changes

### FileWatcher Interface

Monitor file changes in real-time.

**Methods:**

- `watch(path: string, options: FileWatchOptions)` - Start watching a path
  - `recursive?: boolean` - Watch subdirectories
  - `onEvent(event: FileChangeEvent)` - Called on file change
  - `onError(error: Error)` - Called on error
  - `onClose()` - Called when watcher closes (optional)

**Watcher Methods:**

- `close()` - Stop watching

### PTY Interface

Pseudo-terminal operations.

**Methods:**

- `list()` - List active sessions
- `createSession()` - Create a persistent session
- `connect(options: PtyOptions)` - Connect to PTY
  - `sessionId?: string` - For persistent sessions
  - `onData(data: string)` - Receive data
  - `onError(error: Error)` - Handle errors
  - `onClose()` - Connection closed (optional)
- `deleteSession(sessionId: string)` - Delete a session

**PtySession Methods:**

- `sendInput(data: string)` - Send data to terminal
- `runCommand(cmd: string, options: RunCommandOptions)` - Execute with prompt detection
- `resize(cols: number, rows: number)` - Resize terminal
- `close()` - Close connection

## Examples

### Execute Python Script

```typescript
import { VoidRun } from "@voidrun/sdk";

const vr = new VoidRun({});
const sandbox = await vr.createSandbox({ mem: 1024, cpu: 1 });

// Create Python script
await sandbox.fs.createFile("/tmp/script.py");
await sandbox.fs.uploadFile(
  "/tmp/script.py",
  `
import sys
print("Python version:", sys.version)
print("Hello from Python!")
`,
);

const result = await sandbox.exec({ command: "python3 /tmp/script.py" });
console.log(result.data?.stdout);

await sandbox.remove();
```

### Code Interpreter Workflow

```typescript
const sandbox = await vr.createSandbox({ name: 'interpreter-demo' });

// Python data analysis
const result = await sandbox.runCode(`
import json
data = [1, 2, 3, 4, 5]
result = {
    "sum": sum(data),
    "avg": sum(data) / len(data),
    "max": max(data)
}
print(json.dumps(result))
`, { language: 'python' });

console.log(result.results);  // Parsed JSON output

// JavaScript
const jsResult = await sandbox.runCode(`
const fib = (n) => n <= 1 ? n : fib(n-1) + fib(n-2);
console.log(fib(10));
`, { language: 'javascript' });

await sandbox.remove();
```

### Background Process Management

```typescript
const sandbox = await vr.createSandbox({});

// Start a long-running process
const { pid } = await sandbox.commands.run("tail -f /var/log/syslog");

// Attach to stream output
await sandbox.commands.connect(pid, {
  onStdout: (data) => console.log(data),
  onExit: ({ exitCode }) => console.log('Exited:', exitCode),
});

// Later, kill the process
await sandbox.commands.kill(pid);

await sandbox.remove();
```

### Monitor Code Changes

```typescript
const sandbox = await vr.createSandbox({ mem: 1024, cpu: 1 });

// Watch for TypeScript file changes
const watcher = await sandbox.fs.watch("/app/src", {
  recursive: true,
  onEvent: async (event) => {
    console.log(`File ${event.type}: ${event.path}`);

    // Auto-compile on change
    await sandbox.exec({ command: "npm run build" });
  },
});

// Clean up
setTimeout(() => watcher.close(), 60000);
```

### Build & Test Workflow

```typescript
const sandbox = await vr.createSandbox({ mem: 2048, cpu: 2 });

// Upload source code
const sourceCode = `console.log('Hello World');`;
await sandbox.fs.createFile("/app/main.js");
await sandbox.fs.uploadFile("/app/main.js", sourceCode);

// Install dependencies
let result = await sandbox.exec({ command: "npm install" });
if (result.data?.exitCode !== 0) throw new Error("Install failed");

// Run tests
result = await sandbox.exec({ command: "npm test" });
console.log("Test output:", result.data?.stdout);

// Build
result = await sandbox.exec({ command: "npm run build" });
console.log("Build output:", result.data?.stdout);

await sandbox.remove();
```

### Interactive Development Shell

```typescript
const sandbox = await vr.createSandbox({ mem: 1024, cpu: 1 });

// Create a persistent session
const sessionResp = await sandbox.pty.createSession();
const sessionId = sessionResp.data?.sessionId;

const pty = await sandbox.pty.connect({
  sessionId,
  onData: (data) => process.stdout.write(data),
  onClose: () => console.log("Shell closed"),
});

// Interactive commands
pty.sendInput("npm init -y\n");
await new Promise((r) => setTimeout(r, 1000));

pty.sendInput("npm install express\n");
await new Promise((r) => setTimeout(r, 2000));

pty.sendInput('node -e "console.log(process.version)"\n');
await new Promise((r) => setTimeout(r, 500));

pty.close();
await sandbox.remove();
```

## Configuration

The SDK can be configured by passing options to the `VoidRun` constructor:

```typescript
const vr = new VoidRun({
  apiKey: "your-api-key",              // Required: Your API key
  orgId: "your-org-id"                 // Optional: Organization ID
});
```

## Error Handling

```typescript
try {
  const sandbox = await vr.createSandbox({ mem: 256, cpu: 0.5 });
  // ...
} catch (error) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  }
}
```

Common errors:

- **Validation Error** - Invalid sandbox parameters
- **Authentication Error** - Invalid or missing API key
- **Not Found** - Sandbox or session doesn't exist
- **Timeout** - Operation took too long

## Testing

Run the comprehensive test suite:

```bash
npm install
npx tsx example/test-sandbox-exec.ts
```

Available examples:

- `test-sandbox-exec.ts` - Command execution with streaming
- `test-sandbox-fs.ts` - File system operations
- `test-sandbox-lifecycle.ts` - Sandbox lifecycle management
- `test-pty.ts` - PTY session management
- `test-pty-comprehensive.ts` - Full PTY testing (9 scenarios)
- `test-watch.ts` - File watching
- `test-background-exec.ts` - Background process management
- `code-interpreter-example.ts` - Code interpreter usage
- `test-commonjs-import.cjs` - CommonJS import test
- `test-esm-import.mjs` - ESM import test

## Building from Source

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Clean build artifacts
npm run clean
```

## Publishing

```bash
# Build and publish to npm
npm run publish
```

## Troubleshooting

### "API key is required, either pass in constructor or in env vars"

Pass your API key in the constructor:

```typescript
const vr = new VoidRun({
  apiKey: "your-api-key"
});
```

Pass in env vars(.env)
```bash
VR_API_KEY=vr_sddfgd2353erggdfgfdgdgdfg
```

### "Sandbox creation failed"

Ensure your sandbox parameters are valid:

- `mem`: minimum 1024 MB
- `cpu`: minimum 1 core

```typescript
const sandbox = await vr.createSandbox({
  mem: 1024, // At least 1GB
  cpu: 1,    // At least 1 core
});
```

### "PTY Connection Timeout"

Increase timeout for slow systems:

```typescript
const pty = await sandbox.pty.connect({
  sessionId,
  onData: (data) => console.log(data),
});

// For runCommand
const output = await pty.runCommand("slow-command", {
  timeout: 30000, // 30 seconds
});
```

### "File Not Found"

Check the file path:

```typescript
// List files to verify path
const files = await sandbox.fs.listFiles("/app");
console.log(files.data?.files);

// Then access specific file
const content = await sandbox.fs.downloadFile("/app/file.txt");
```

## API Documentation

Full API documentation is available at:

- [API Client Docs](./src/api-client/docs/)

## Contributing

Contributions are welcome! Please check the main repository for guidelines.

## License

ISC License - See LICENSE file for details

## Support

- 📧 Email: support@void-run.com
- 🐛 Issues: [GitHub Issues](https://github.com/voidrun/ts-sdk/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/voidrun/ts-sdk/discussions)

---

**Made with ❤️ by VoidRun**
