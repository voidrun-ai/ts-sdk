import { VoidRun } from '../src/index.js';

async function main() {
    const vr = new VoidRun({});

    console.log('Creating sandbox...');
    const sandbox = await vr.createSandbox({
        name: 'test-pty-debug',
        envVars: {
            DEBUG: 'pty'
        }
    });

    try {
        console.log('Connecting to PTY...');
        const ephemeralPty = await sandbox.pty.connect({
            onData: (data) => {
                console.log('[DATA]:', JSON.stringify(data));
            }
        });

        console.log('Waiting 2 seconds before writing...');
        await new Promise(r => setTimeout(r, 2000));
        
        console.log('Writing command...');
        ephemeralPty.sendInput('echo "Hello from ephemeral PTY"\n');
        
        await new Promise(r => setTimeout(r, 2000));
        console.log('Done waiting');
        ephemeralPty.close();

    } finally {
        console.log('Cleaning up sandbox...');
        await sandbox.remove();
    }
}

main().catch(console.error);
