import { VoidRun } from "../src/index.js";

async function main() {
    const vr = new VoidRun({
    });

    const sandbox = await vr.createSandbox({
        // name: 'test',
        // cpu: 1,
        // mem: 1024,
        // orgId: '123',
        // envVars: {
        //     DEBUG: 'true',
        //     LOG_LEVEL: 'info'
        // }
    });
    console.log(sandbox.id);

    const sandboxInfo = await vr.getSandbox(sandbox.id);
    console.log(sandboxInfo);

    const { sandboxes, meta } = await vr.listSandboxes();
    console.log(sandboxes.length, meta);

    setTimeout(async () => {
        await vr.removeSandbox(sandbox.id);
        console.log('Sandbox removed');
    }, 10000);

    const sdbx = await vr.createSandbox({});
    console.log(sdbx.id);

    console.log('info---', await sdbx.info());

    setTimeout(async () => {
        await sdbx.remove();
        console.log('Second sandbox removed');
    }, 20000);
}

main();