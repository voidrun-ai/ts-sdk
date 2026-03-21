import { VoidRun } from '../src/index.js';

async function main() {
    const vr = new VoidRun({});
    const sbx = await vr.createSandbox({ name: 'test-ts-short' });
    try {
        const tsResult = await sbx.runCode(
            `const n: number = 42; console.log(n * 2);`,
            { language: 'typescript' }
        );
        console.log('Results:', tsResult.results);
        console.log('Success:', tsResult.success);
        console.log('Stdout:', tsResult.stdout);
        console.log('Stderr:', tsResult.stderr);
    } finally {
        await sbx.remove();
        console.log('Done');
    }
}
main().catch(console.error);
