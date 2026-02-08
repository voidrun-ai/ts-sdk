
import { VoidRun, FileChangeEvent } from '../src/index.js';

async function main() {

    const vr = new VoidRun({});

    console.log('Creating sandbox for watch test...');
    const sandbox = await vr.createSandbox({
        name: 'watch-test-' + Date.now()
    });

    try {
        console.log('Starting watch on /tmp...');

        const events: FileChangeEvent[] = [];
        const watcher = await sandbox.fs.watch('/tmp', {
            recursive: true,
            onEvent: (event) => {
                console.log('Received event:', event);
                events.push(event);
            },
            onError: (err) => console.error('Watcher error:', err)
        });

        console.log('Watcher connected!');

        // Wait a bit for connection to settle
        await new Promise(r => setTimeout(r, 1000));

        console.log('Creating file /tmp/hello.txt...');
        await sandbox.fs.createFile('/tmp/hello.txt');
        await sandbox.fs.uploadFile('/tmp/hello11.txt', 'Hello World');
        await sandbox.fs.deleteFile('/tmp/hello.txt');

        await sandbox.fs.createDirectory('/tmp/newdir');
        await sandbox.fs.deleteFile('/tmp/newdir');


        // Wait for events
        console.log('Waiting for events...');
        await new Promise(r => setTimeout(r, 2000));

        if (events.length > 0) {
            console.log('SUCCESS: Received events:', events.length);
        } else {
            console.error('FAILURE: No events received');
        }

        watcher.close();

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Cleaning up sandbox...');
        await sandbox.remove();
    }
}

main().catch(console.error);
