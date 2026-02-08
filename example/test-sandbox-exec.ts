import { VoidRun } from "../src/index.js";

async function main() {
    const vr = new VoidRun({});

    console.log("Creating sandbox for exec tests...");
    const sandbox = await vr.createSandbox({
        name: "exec-test-" + Date.now(),
        cpu: 1,
        mem: 1024,
        envVars: {
            DEBUG: 'true',
            LOG_LEVEL: 'info'
        }
    });
    console.log(`Sandbox created: ${sandbox.id}`);

    const step = async (title: string, fn: () => Promise<any>) => {
        console.log(`\n[TEST] ${title}`);
        try {
            const result = await fn();
            console.log("✅ Success", result);
            // Show the actual response data
            if (result?.data) {
                console.log("Output:", JSON.stringify(result.data, null, 2));
            } else {
                console.log("Full response:", JSON.stringify(result, null, 2));
            }
            return result;
        } catch (err: any) {
            console.log("❌ Failed:", err.message);
            throw err;
        }
    };

    try {
        // Test 1: Simple echo command
        await step("Simple echo command", () =>
            sandbox.exec({ command: "echo 'Hello from exec!'" })
        );

        // Test 2: Get system information
        await step("Get system info (uname)", () =>
            sandbox.exec({ command: "uname -a" })
        );

        // Test 3: List directory
        await step("List /tmp directory", () =>
            sandbox.exec({ command: "ls -la /tmp" })
        );

        // Test 3b: Streaming exec (SSE)
        await step("Streaming exec (SSE)", async () => {
            let stdout = "";
            let stderr = "";
            let exit: any = null;

            await sandbox.exec({
                command: "seq 1 10 | while read i; do echo \"streaming output $i\"; sleep 1; done"
            }, {
                onStdout: (data) => { console.log('out', data);
                 },
                onStderr: (data) => { console.log('err', data); },
                onExit: (result) => { exit = result; console.log('exit', result); }
            });

            return { stdout, stderr, exit };
        });

        // Test 4: Command with environment variables
        await step("Command with environment variables", () =>
            sandbox.exec({
                command: "echo \"MY_VAR=$MY_VAR and CUSTOM=$CUSTOM\"",
                env: {
                    MY_VAR: "test_value_123",
                    CUSTOM: "custom_value"
                }
            })
        );

        // Test 5: Command with working directory
        await step("Command with working directory", () =>
            sandbox.exec({
                command: "pwd",
                cwd: "/tmp"
            })
        );

        // Test 6: Command with both env and cwd
        await step("Command with env and cwd", () =>
            sandbox.exec({
                command: "echo \"Current dir: $(pwd), VAR=$TEST_VAR\"",
                cwd: "/var",
                env: { TEST_VAR: "from_env" }
            })
        );

        // Test 7: Multi-line piped command
        await step("Piped commands", () =>
            sandbox.exec({
                command: "echo -e 'line1\\nline2\\nline3' | grep line2"
            })
        );

        // Test 8: Command with custom timeout (short)
        await step("Quick command with 5s timeout", () =>
            sandbox.exec({
                command: "sleep 1 && echo 'Completed after 1s'",
                timeout: 5
            })
        );

        // Test 9: Create file and verify
        await step("Create file in /tmp", () =>
            sandbox.exec({
                command: "echo 'test content' > /tmp/exec-test.txt && cat /tmp/exec-test.txt"
            })
        );

        // Test 10: Check exit code - successful command
        await step("Command with exit code 0", () =>
            sandbox.exec({ command: "exit 0" })
        );

        // Test 11: Command that fails (non-zero exit)
        await step("Command with non-zero exit code", async () => {
            const result = await sandbox.exec({ command: "ls /nonexistent/path" });
            if (result.data?.exitCode !== 0) {
                console.log(`Got expected non-zero exit code: ${result.data?.exitCode}`);
            }
            return result;
        });

        // Test 12: Complex command with multiple operations
        await step("Complex multi-operation command", () =>
            sandbox.exec({
                command: `
                    mkdir -p /tmp/test-dir &&
                    echo "file1" > /tmp/test-dir/file1.txt &&
                    echo "file2" > /tmp/test-dir/file2.txt &&
                    ls -la /tmp/test-dir &&
                    rm -rf /tmp/test-dir
                `
            })
        );

        // Test 13: Get environment
        await step("List all environment variables", () =>
            sandbox.exec({ command: "env | sort" })
        );

        // Test 14: Check disk space
        await step("Check disk space", () =>
            sandbox.exec({ command: "df -h" })
        );

        // Test 15: Process listing
        await step("List running processes", () =>
            sandbox.exec({ command: "ps aux" })
        );

        // Test 16: Network test (if available)
        await step("Check network interfaces", () =>
            sandbox.exec({ command: "ip addr show || ifconfig" })
        );

        // Test 17: File operations
        await step("File operations test", () =>
            sandbox.exec({
                command: `
                    touch /tmp/test-exec-file.txt &&
                    echo "content" > /tmp/test-exec-file.txt &&
                    cat /tmp/test-exec-file.txt &&
                    rm /tmp/test-exec-file.txt
                `
            })
        );

        // Test 18: Empty command (should fail validation)
        console.log("\n[TEST] Empty command validation");
        try {
            await sandbox.exec({ command: "" });
            console.log("❌ Should have failed with empty command");
        } catch (err: any) {
            console.log("✅ Correctly rejected empty command:", err.message);
        }

        // Test 19: Command with special characters
        await step("Command with special characters", () =>
            sandbox.exec({
                command: "echo 'Special: !@#$%^&*()_+-={}[]|:;<>?,./'"
            })
        );

        // Test 20: Long timeout command
        await step("Command with long timeout (10s)", () =>
            sandbox.exec({
                command: "sleep 2 && echo 'Finished after 2s sleep'",
                timeout: 10
            })
        );

        console.log("\n✅ All exec tests completed successfully!");

    } catch (err) {
        console.error("\n❌ Test suite failed:", err);
        process.exit(1);
    } finally {
        // Cleanup: delete sandbox
        console.log(`\nCleaning up sandbox ${sandbox.id}...`);
        try {
            await sandbox.remove();
            console.log("✅ Sandbox deleted");
        } catch (err) {
            console.log("⚠️  Failed to delete sandbox:", err);
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
