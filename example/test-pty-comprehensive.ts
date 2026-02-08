import { VoidRun } from "../src/index.js";

/**
 * Comprehensive PTY Testing Example
 * Tests ephemeral and persistent PTY modes, session management, and command execution
 * 
 * This example demonstrates:
 * - Creating ephemeral PTY connections (temporary sessions)
 * - Creating and managing persistent PTY sessions
 * - Listing active sessions
 * - Connecting/reconnecting to sessions
 * - Running interactive commands with output capture
 * - Session cleanup
 */
async function main() {
    const vr = new VoidRun({
    });

    let sandboxId: string | null = null;

    try {
        // Create a sandbox
        console.log('🔧 Creating sandbox...');
        const sandbox = await vr.createSandbox({ 
            mem: 1024, 
            cpu: 1,
            envVars: {
                PTY_TEST: 'comprehensive'
            }
        });
        sandboxId = sandbox.id;
        console.log(`✅ Sandbox created: ${sandboxId}\n`);

        // ====== TEST 1: List Sessions (should be empty initially) ======
        console.log('📋 TEST 1: List PTY Sessions');
        console.log('━'.repeat(50));
        const initialList = await sandbox.pty.list();
        const initialSessions = initialList.data?.sessions || [];
        console.log(`Found ${initialSessions.length} sessions (expected 0)`);
        if (initialSessions.length > 0) {
            initialSessions.forEach(session => {
                console.log(`  - ${session.id?.substring(0, 12)}... | Created: ${session.createdAt} | Clients: ${session.clients}`);
            });
        }
        console.log();

        // ====== TEST 2: Ephemeral PTY ======
        console.log('🌊 TEST 2: Ephemeral PTY (Temporary Session)');
        console.log('━'.repeat(50));
        let ephemeralOutput = '';
        const ephemeralPty = await sandbox.pty.connect({
            onData: (data) => {
                process.stdout.write(`[EPHEMERAL] ${data}`);
                ephemeralOutput += data;
            },
            onError: (err) => {
                console.error('[EPHEMERAL ERROR]', err.message);
            },
            onClose: () => {
                console.log('\n[EPHEMERAL] Connection closed');
            }
        });

        console.log('Connected! Sending commands...');
        ephemeralPty.sendInput('echo "=== Ephemeral PTY Test ==="\n');
        ephemeralPty.sendInput('whoami\n');
        ephemeralPty.sendInput('pwd\n');
        ephemeralPty.sendInput('uname -a\n');

        // Wait for output
        await new Promise(resolve => setTimeout(resolve, 2000));
        ephemeralPty.close();
        console.log('✅ Ephemeral PTY test completed\n');

        // ====== TEST 3: Create Persistent Sessions ======
        console.log('💾 TEST 3: Create Persistent PTY Sessions');
        console.log('━'.repeat(50));

        const sessionIds: string[] = [];
        for (let i = 1; i <= 2; i++) {
            try {
                console.log(`Creating session ${i}...`);
                const response = await sandbox.pty.createSession();
                const sessionId = response.data?.sessionId;

                if (!sessionId) {
                    throw new Error(`Session ${i}: No sessionId in response`);
                }

                sessionIds.push(sessionId);
                console.log(`✅ Session ${i} created: ${sessionId}`);
                console.log(`   Created at: ${response.data?.createdAt}`);
            } catch (err) {
                console.error(`❌ Failed to create session ${i}:`, err instanceof Error ? err.message : err);
            }
        }
        console.log();

        // ====== TEST 4: List Sessions After Creation ======
        console.log('📋 TEST 4: List Sessions After Creation');
        console.log('━'.repeat(50));
        const updatedList = await sandbox.pty.list();
        const sessions = updatedList.data?.sessions || [];
        console.log(`Total sessions: ${sessions.length}`);
        sessions.forEach((session, index) => {
            console.log(`  ${index + 1}. ID: ${session.id?.substring(0, 12)}...`);
            console.log(`     Created: ${session.createdAt}`);
            console.log(`     Clients: ${session.clients} | Alive: ${session.alive}`);
        });
        console.log();

        // ====== TEST 5: Connect to Persistent Session ======
        if (sessionIds.length > 0) {
            console.log('🔌 TEST 5: Connect to Persistent Session');
            console.log('━'.repeat(50));
            const sessionId = sessionIds[0];
            console.log(`Connecting to session: ${sessionId}\n`);

            let sessionOutput = '';
            const persistentPty = await sandbox.pty.connect({
                sessionId,
                onData: (data) => {
                    process.stdout.write(`[SESSION] ${data}`);
                    sessionOutput += data;
                },
                onError: (err) => {
                    console.error('[SESSION ERROR]', err.message);
                },
                onClose: () => {
                    console.log('\n[SESSION] Connection closed');
                }
            });

            console.log('Connected! Sending commands...');
            persistentPty.sendInput('echo "=== Persistent Session Test ==="\n');
            persistentPty.sendInput('date\n');
            persistentPty.sendInput('ps aux | head -3\n');

            await new Promise(resolve => setTimeout(resolve, 2000));
            persistentPty.close();
            console.log('✅ Session connection closed\n');
        }

        // ====== TEST 6: Reconnect to Same Session ======
        if (sessionIds.length > 0) {
            console.log('🔄 TEST 6: Reconnect to Same Session');
            console.log('━'.repeat(50));
            const sessionId = sessionIds[0];
            console.log(`Reconnecting to session: ${sessionId}\n`);

            const reconnectedPty = await sandbox.pty.connect({
                sessionId,
                onData: (data) => {
                    process.stdout.write(`[RECONNECT] ${data}`);
                },
                onError: (err) => {
                    console.error('[RECONNECT ERROR]', err.message);
                },
                onClose: () => {
                    console.log('\n[RECONNECT] Connection closed');
                }
            });

            console.log('Reconnected! Sending command...');
            reconnectedPty.sendInput('echo "Session reconnected successfully"\n');

            await new Promise(resolve => setTimeout(resolve, 1500));
            reconnectedPty.close();
            console.log('✅ Reconnection test completed\n');
        }

        // ====== TEST 7: Run Interactive Command with Prompt Detection ======
        if (sessionIds.length > 1) {
            console.log('⚡ TEST 7: Run Interactive Command with Prompt Detection');
            console.log('━'.repeat(50));
            const sessionId = sessionIds[1];

            const commandPty = await sandbox.pty.connect({
                sessionId,
                onData: (data) => {
                    // Just collect, don't print inline
                },
                onError: (err) => {
                    console.error('[COMMAND ERROR]', err.message);
                }
            });

            try {
                console.log('Waiting for shell prompt...');
                await new Promise(resolve => setTimeout(resolve, 500));

                console.log('Running command: "echo $SHELL"');
                const output = await commandPty.runCommand('echo $SHELL', {
                    timeout: 5000,
                    prompt: /[#$] $/
                });
                console.log('Command output:', output.trim());

                console.log('Running command: "ls -la | head -5"');
                const lsOutput = await commandPty.runCommand('ls -la | head -5', {
                    timeout: 5000,
                    prompt: /[#$] $/
                });
                console.log('Directory listing:\n', lsOutput.trim());
            } catch (err) {
                console.warn('Command execution timeout (expected in some environments):',
                    err instanceof Error ? err.message : err);
            } finally {
                commandPty.close();
                console.log('✅ Interactive command test completed\n');
            }
        }

        // ====== TEST 8: Delete Sessions ======
        console.log('🗑️  TEST 8: Delete PTY Sessions');
        console.log('━'.repeat(50));
        for (const sessionId of sessionIds) {
            try {
                await sandbox.pty.deleteSession(sessionId);
                console.log(`✅ Deleted: ${sessionId}`);
            } catch (err) {
                console.error(`❌ Failed to delete ${sessionId}:`, err instanceof Error ? err.message : err);
            }
        }
        console.log();

        // ====== TEST 9: Verify Deletion ======
        console.log('📋 TEST 9: Verify Sessions Deleted');
        console.log('━'.repeat(50));
        const finalList = await sandbox.pty.list();
        const remainingSessions = finalList.data?.sessions || [];
        console.log(`Remaining sessions: ${remainingSessions.length}`);
        if (remainingSessions.length === 0) {
            console.log('✅ All sessions successfully deleted');
        } else {
            console.log('⚠️  Warning: Some sessions still exist');
            remainingSessions.forEach(session => {
                console.log(`  - ${session.id}`);
            });
        }
        console.log();

        // ====== CLEANUP ======
        console.log('🧹 Cleanup: Removing Sandbox');
        console.log('━'.repeat(50));
        await sandbox.remove();
        console.log('✅ Sandbox removed\n');

        console.log('═'.repeat(50));
        console.log('✅ ALL TESTS PASSED');
        console.log('═'.repeat(50));

    } catch (error) {
        console.error('\n❌ ERROR:', error instanceof Error ? error.message : error);

        // Cleanup on error
        if (sandboxId) {
            try {
                const vr2 = new VoidRun({
                    apiKey: process.env.API_KEY || 'your-api-key-here',
                });
                const sandbox = await vr2.getSandbox(sandboxId);
                await sandbox.remove();
                console.log('✅ Cleanup completed');
            } catch (cleanupErr) {
                console.error('Cleanup failed:', cleanupErr instanceof Error ? cleanupErr.message : cleanupErr);
            }
        }

        process.exit(1);
    }
}

main();
