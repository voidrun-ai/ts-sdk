# VoidRun TypeScript SDK

A powerful, type-safe SDK for interacting with VoidRun AI Sandboxes. Execute code, manage files, watch file changes, and interact with pseudo-terminals in isolated environments.

[![npm version](https://img.shields.io/npm/v/@voidrun/sdk)](https://www.npmjs.com/package/@voidrun/sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- 🏗️ **Sandbox Management** - Create, list, snapshot, and restore sandboxes
- 🚀 **Code Execution** - Execute commands with real-time output capture
- 📁 **File Operations** - Create, read, delete, compress, and extract files
- 👀 **File Watching** - Monitor file changes in real-time via WebSocket
- 💻 **Pseudo-Terminal (PTY)** - Interactive terminal sessions (ephemeral & persistent)
- 🧠 **Code Interpreter** - Easy multi-language code execution (Python, JavaScript, Bash, etc.)
- 🔐 **Type-Safe** - Full TypeScript support with generated types from OpenAPI
- ⚡ **WebSocket Support** - Real-time streaming for PTY, file watches, and execution
- 🎯 **Promise-Based** - Modern async/await API

## Installation

```bash
npm install @voidrun/sdk
```

Or with yarn:

```bash
yarn add @voidrun/sdk
```

## Quick Start

### Authentication

Set your API key via environment variable:

```bash
export API_KEY="your-api-key-here"
```

### Basic Usage

```typescript
import { VoidRun } from "@voidrun/sdk";

// Initialize the SDK
const vr = new VoidRun({});

// Create a sandbox
const sandbox = await vr.createSandbox({ mem: 1024, cpu: 1 });

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
// Create a sandbox
const sandbox = await vr.createSandbox({
  mem: 1024, // Memory in MB (optional, has defaults)
  cpu: 1, // CPU cores (optional, has defaults)
});

// List all sandboxes
const { sandboxes, meta } = await vr.listSandboxes();
console.log(`Total sandboxes: ${sandboxes.length}`);

// Get a specific sandbox
const existingSandbox = await vr.getSandbox(sandboxId);

// Remove a sandbox
await sandbox.remove();
```

### Code Execution

Execute commands and capture output, errors, and exit codes.

```typescript
const result = await sandbox.exec({ command: "ls -la /home" });

console.log(result.data?.stdout); // stdout
console.log(result.data?.stderr); // stderr
console.log(result.data?.exitCode); // exit code
```

### Code Interpreter

Execute code in multiple programming languages with a simple, intuitive API

```typescript
// Initialize interpreter with your language
await sandbox.interpreter.initialize("python");

// Execute code
const result = await sandbox.interpreter.execute("print(2 + 2)");
if (result.success) {
  console.log(result.output); // "4"
}

// Execute multiple snippets
const results = await sandbox.interpreter.executeMultiple([
  "x = 10",
  "y = 20",
  "print(x + y)",
]);

// Switch languages
await sandbox.interpreter.reset("javascript");
const jsResult = await sandbox.interpreter.execute("console.log(2 + 2)");

// Clean up
await sandbox.interpreter.close();
```

Supported languages: **Python**, **JavaScript**, **Node.js**, **Bash**, **Go**, **Ruby**, **Java**, **C#**

See [Code Interpreter API](./CODE_INTERPRETER_API.md) for comprehensive documentation.

### File Operations

Create, read, update, and manage files in the sandbox.

```typescript
// Create a file
await sandbox.fs.createFile("/tmp/hello.txt");

// Upload content to file
await sandbox.fs.uploadFile("/tmp/hello.txt", "Hello, World!");

// Read a file
const buffer = await sandbox.fs.downloadFile("/tmp/hello.txt");
const content = buffer.toString();

// Delete a file
await sandbox.fs.deleteFile("/tmp/hello.txt");

// List directory
const result = await sandbox.fs.listFiles("/tmp");
const files = result.data?.files;

// Get file stats
const stats = await sandbox.fs.statFile("/tmp/hello.txt");

// Compress files
await sandbox.fs.compressFile("/tmp", "tar.gz");

// Extract archive
await sandbox.fs.extractArchive("/tmp/archive.tar.gz", "/tmp/extracted");

// Create directory
await sandbox.fs.createDirectory("/tmp/mydir");

// Move file
await sandbox.fs.moveFile("/tmp/file.txt", "/tmp/newfile.txt");

// Copy file
await sandbox.fs.copyFile("/tmp/file.txt", "/tmp/copy.txt");
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
pty.write('echo "Hello"\n');
pty.write("pwd\n");

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
pty.write('echo "Hello"\n');

// Close connection
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

const output = await pty.runCommand("echo $SHELL", {
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
new VoidRun(options?: VoidRunOptions)
```

**Options:**

- `apiKey?: string` - API key (defaults to `process.env.API_KEY`)
- `baseUrl?: string` - Base API URL (defaults to `process.env.VOIDRUN_BASE_URL`)
- `orgId?: string` - Organization ID (optional)

**Methods:**

- `createSandbox(options: SandboxOptions)` - Create a new sandbox
  - `name?: string` - Sandbox name
  - `templateId?: string` - Template ID
  - `cpu?: number` - CPU cores
  - `mem?: number` - Memory in MB
  - `orgId?: string` - Organization ID
  - `userId?: string` - User ID
  - `sync?: boolean` - Sync mode
  - `language?: 'javascript' | 'typescript' | 'python'` - Language
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
- `language?: string` - Language (optional)
- `fs: FS` - File system interface
- `pty: PTY` - PTY interface

**Methods:**

- `exec(request: ExecRequest)` - Execute a command
  - `request.command: string` - Command to execute
  - `request.cwd?: string` - Working directory (optional)
  - `request.env?: Record<string, string>` - Environment variables (optional)
  - `request.timeout?: number` - Timeout in seconds (optional)
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

### FileSystem Interface

Manage files and directories.

**Methods:**

- `createFile(path: string)` - Create a file
- `uploadFile(path: string, content: string)` - Upload file content
- `uploadFileStream(path: string, stream: ReadableStream)` - Upload file as stream
- `uploadFileFromPath(remotePath: string, localPath: string)` - Upload from local file
- `downloadFile(path: string)` - Download file as Buffer
- `downloadFileStream(path: string)` - Download file as ReadableStream
- `deleteFile(path: string)` - Delete a file
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

- `write(data: string)` - Send data
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
pty.write("npm init -y\n");
await new Promise((r) => setTimeout(r, 1000));

pty.write("npm install express\n");
await new Promise((r) => setTimeout(r, 2000));

pty.write('node -e "console.log(process.version)"\n');
await new Promise((r) => setTimeout(r, 500));

pty.close();
await sandbox.remove();
```

## Configuration

### Environment Variables

```bash
# API Key (required)
export API_KEY="your-api-key-here"

# Base URL (optional)
export VOIDRUN_BASE_URL="https://api.voidrun.com"
```

### .env File

Create a `.env` file in your project root:

```env
API_KEY=your-api-key-here
VOIDRUN_BASE_URL=https://api.voidrun.com
```

Then run with:

```bash
npx tsx --env-file=.env your-script.ts
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
npx tsx --env-file=.env example/test-pty-comprehensive.ts
```

Available examples:

- `test-pty-comprehensive.ts` - Full PTY testing (9 scenarios)
- `test-sandbox-exec.ts` - Code execution examples
- `test-sandbox-fs.ts` - File system operations
- `test-sandbox-lifecycle.ts` - Sandbox management
- `test-watch.ts` - File watching
- `js-example.ts` - JavaScript example
- `py-example.ts` - Python example

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

### "API_KEY is not set"

Set your API key:

```bash
export API_KEY="your-api-key"
```

### "Sandbox creation failed"

Ensure your sandbox parameters are valid:

- `mem`: minimum 1024 MB
- `cpu`: minimum 1 core

```typescript
const sandbox = await vr.createSandbox({
  mem: 1024, // At least 1GB
  cpu: 1, // At least 1 core
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
const content = await sandbox.fs.readFile("/app/file.txt");
```

## API Documentation

Full API documentation is available at:

- [OpenAPI Spec](./openapi.yml)
- [API Docs](./src/api-client/docs/)

## Contributing

Contributions are welcome! Please check the main repository for guidelines.

## License

ISC License - See LICENSE file for details

## Support

- 📧 Email: support@voidrun.com
- 🐛 Issues: [GitHub Issues](https://github.com/voidrun/ts-sdk/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/voidrun/ts-sdk/discussions)

## Changelog

### v0.0.2

- Fixed PTY session response field mapping
- Added fallback logic for empty sessionId
- Improved error handling and validation

### v0.0.1

- Initial release
- Sandbox management
- File operations
- Code execution
- PTY support

---

**Made with ❤️ by VoidRun**
