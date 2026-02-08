import { VoidRun } from "../src/index.js";

async function main() {
    const vr = new VoidRun({});

    let sdbx;
    try {
        console.log('Creating sandbox...');
        sdbx = await vr.createSandbox({
            name: 'code-interpreter-ci-test',
            envVars: {
                CI: 'true',
                TEST_MODE: 'enabled'
            }
        });

        console.log('Executing code snippet: 5 * 7');
        let result = await sdbx.runCode('console.log(5 * 7)', { language: 'javascript' });
        console.log(`Output: ${result.stdout}`);
        if (result.stdout.trim() !== '35') {
            throw new Error('Unexpected output for 5 * 7');
        }

        result = await sdbx.runCode('const i = 444; console.log("Loopingiiii", i)', { language: 'javascript' });
        console.log('console js iii', result.stdout.trim());
        
        result = await sdbx.runCode(`
            function factorial(n) {
                if (n === 0) return 1;
                return n * factorial(n - 1);
            }
            console.log(factorial(6));
        `, { language: 'javascript' });
        console.log(`Output factorial: ${result.stdout}`, result);
        // Extract the last number from the output (should be 720)
        const factorialMatch = result.stdout.match(/\d+/g);
        const lastNumber = factorialMatch ? factorialMatch[factorialMatch.length - 1] : null;
        if (lastNumber !== '720') {
            throw new Error(`Unexpected output for factorial(6): got ${result.stdout}`);
        }

    } catch (error) {
        console.error('Error during CI test:', error);
        process.exit(1);

    } finally {
        if (sdbx) {
            console.log('Removing sandbox...');
            await sdbx.remove();
            console.log('Sandbox removed.');
        }
    }

    console.log('CI test completed successfully.');
    process.exit(0);

}

main().catch((err) => {
    console.error('Error during test CI execution:', err);
    process.exit(1);
});