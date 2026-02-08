
import { VoidRun, PtySession } from '../src/index.js';

async function main() {

    const vr = new VoidRun({});

    console.log('Creating sandbox...');
    const sandbox = await vr.createSandbox({
        name: 'test-pty-refactor',
        envVars: {
            NODE_ENV: 'development'
        }
    });

    try {
        // const ex = await sandbox.exec({ command: 'hostnamectl' });
        // console.log('Sandbox exec output:', ex);
        console.log('--- Ephemeral PTY ---');
        const ephemeralPty = await sandbox.pty.connect({
            onData: (data) => process.stdout.write(data)
        });

        ephemeralPty.sendInput('echo "Hello from ephemeral PTY"\n');
        await new Promise(resolve => setTimeout(resolve, 1000));
        ephemeralPty.close();

        console.log('\n--- Persistent PTY Session Management ---');
        console.log('Creating session...');
        const session = await sandbox.pty.createSession();
        const sessionId = session.data?.sessionId;
        if (!sessionId) {
            throw new Error('Failed to create PTY session: missing sessionId');
        }

        const pty = await sandbox.pty.connect({
            sessionId,
            onData: (data) => process.stdout.write(data)
        }) as PtySession;

        // Use runCommand for commands that need to wait for output
        await pty.runCommand('ls -la');

        console.log('\nResizing terminal...');
        await pty.resize(100, 40);

        await pty.runCommand('echo "Resized!"');

        const response = await sandbox.pty.list();
        const sessions = response.data || [];
        // console.log('\nActive sessions:', sessions);

        const sessionId = (sessions as any)[0]?.id;
        // pty.close();

        // if (sessionId) {
        //     console.log('\nDeleting session:', sessionId);
        //     await sandbox.pty.deleteSession(sessionId);
        // }

        // console.log('Done!');

    } finally {
        console.log('Cleaning up sandbox...');
        await sandbox.remove();
    }
}

main().catch(console.error);
