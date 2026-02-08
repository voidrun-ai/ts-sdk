import { VoidRun } from "../src/index.js";

async function main() {
    const vr = new VoidRun({});

    console.log("Creating sandbox for process management tests...");
    const sandbox = await vr.createSandbox({
        name: "test-commands",
    });

    console.log("Sandbox created:", sandbox.id);

    try {
        // Test 1: Run a long-running background process
        console.log("\n[TEST] Running background process (sleep 5)...");
        const handle = await sandbox.commands.run("sleep 5");
        console.log("✅ Process started:", { pid: handle.pid, command: handle.command });

        // Test 2: List running processes
        console.log("\n[TEST] Listing running processes...");
        const procs = await sandbox.commands.list();
        console.log("✅ Running processes:", procs.processes);
        const found = procs.processes.find(p => p.pid === handle.pid);
        if (found) {
            console.log(`✅ Found our process: PID ${found.pid} - ${found.command}`);
        } else {
            console.log(`⚠️ Process ${handle.pid} not in list`);
        }

        // Test 3: Wait for process to complete
        console.log("\n[TEST] Waiting for process to complete...");
        const result = await sandbox.commands.wait(handle.pid);
        console.log("✅ Process completed:", result);

        // Test 4: Run background process and attach to it
        console.log("\n[TEST] Running background process with output streaming...");
        const handle2 = await sandbox.commands.run("seq 1 5 | while read i; do echo line $i; sleep 0.5; done");
        console.log("✅ Process 2 started:", { pid: handle2.pid });

        let output = "";
        console.log("\n[ATTACHING] Streaming output from process...");
        await sandbox.commands.connect(handle2.pid, {
            onStdout: (data) => {
                output += data;
                process.stdout.write(data);
            },
            onExit: (result) => {
                console.log(`\n✅ Process exited with code: ${result.exitCode}`);
            },
        });

        console.log("Captured output:", output);

        // Test 5: Kill a process
        console.log("\n[TEST] Running long process to kill...");
        const handle3 = await sandbox.commands.run("sleep 100");
        console.log("✅ Process 3 started:", { pid: handle3.pid });

        console.log("Killing process...");
        const killResult = await sandbox.commands.kill(handle3.pid);
        console.log("✅ Process killed:", killResult.message);

        console.log("\n✅ All process management tests passed!");

    } finally {
        console.log("\nCleaning up sandbox...");
        await sandbox.remove();
        console.log("✅ Sandbox deleted");
    }
}

main().catch(console.error);
