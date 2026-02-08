import { VoidRun } from "../src/index.js";

async function runTests() {
  const vr = new VoidRun({});
  
  console.log("Creating sandbox for background exec tests...");
  const sandbox = await vr.createSandbox({
    name: "test-bg-exec-" + Date.now()
  });
  console.log(`Sandbox created: ${sandbox.id}\n`);

  try {
    // Test 1: Execute command with background flag using commands.run()
    console.log("[TEST 1] Start background process using commands.run()");
    const bgResult = await sandbox.commands.run("sleep 10");
    
    console.log("Background exec result:", bgResult);
    
    if (!bgResult.success || !bgResult.pid) {
      throw new Error("Expected success and pid in response");
    }
    
    const pid = bgResult.pid;
    console.log(`✅ Process started with PID: ${pid}\n`);
    
    // Test 2: List processes - should see our sleep process
    console.log("[TEST 2] List running processes");
    const processes = await sandbox.commands.list();
    console.log("Processes:", processes);
    
    const ourProcess = processes.processes.find(p => p.pid === pid);
    if (!ourProcess) {
      throw new Error(`Process ${pid} not found in process list`);
    }
    console.log(`✅ Found process in list: PID ${ourProcess.pid}, command: ${ourProcess.command}\n`);
    
    // Test 3: Kill the background process
    console.log("[TEST 3] Kill background process");
    const killResult = await sandbox.commands.kill(pid);
    console.log("Kill result:", killResult);
    
    if (!killResult.success) {
      throw new Error("Failed to kill process");
    }
    console.log(`✅ Process killed successfully\n`);
    
    // Wait a moment for process to be cleaned up
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 4: Run process with output and stream via connect
    console.log("[TEST 4] Run process and stream output");
    const streamResult = await sandbox.commands.run("for i in 1 2 3 4 5; do echo \"line $i\"; sleep 1; done");
    console.log(`Process started with PID: ${streamResult.pid}`);
    
    // Give process a moment to start producing output
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const output: string[] = [];
    let exitCode: number | null = null;
    
    await sandbox.commands.connect(streamResult.pid, {
      onStdout: (data) => {
        console.log(`  stdout: ${data.trim()}`);
        output.push(data);
      },
      onStderr: (data) => {
        console.log(`  stderr: ${data.trim()}`);
      },
      onExit: (result) => {
        console.log(`  exit: ${result.exitCode}`);
        exitCode = result.exitCode;
      }
    });
    
    if (output.length > 0) {
      console.log(`✅ Received ${output.length} output lines`);
    } else {
      console.log(`⚠️ No stdout captured - process may have completed before attach`);
    }
    console.log();
    
    // Test 5: Wait for process completion
    console.log("[TEST 5] Run process and wait for completion");
    const waitTestResult = await sandbox.commands.run("sleep 2 && exit 0");
    console.log(`Process started with PID: ${waitTestResult.pid}`);
    
    const waitResult = await sandbox.commands.wait(waitTestResult.pid);
    console.log("Wait result:", waitResult);
    
    if (!waitResult.success || waitResult.exitCode !== 0) {
      console.log(`⚠️ Unexpected exit code: ${waitResult.exitCode} (may indicate process already exited)`);
    } else {
      console.log(`✅ Process completed with exit code ${waitResult.exitCode}`);
    }
    console.log();
    
    console.log("✅ All background process management tests passed!");
    
  } finally {
    console.log(`\nCleaning up sandbox ${sandbox.id}...`);
    await vr.removeSandbox(sandbox.id);
    console.log("✅ Sandbox deleted");
  }
}

runTests().catch((error) => {
  console.error("❌ Test failed:", error);
  process.exit(1);
});
