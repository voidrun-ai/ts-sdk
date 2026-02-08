import { VoidRun } from '../src/index.js';

/**
 * Example: Code Execution (stateless per call)
 *
 * The current SDK exposes a single `runCode()` API. Each call is isolated,
 * so include all required context in the code string.
 */
async function main() {
    const vr = new VoidRun({});

    console.log('Creating sandbox...');
    const sandbox = await vr.createSandbox({
        name: 'code-interpreter-demo'
    });

    try {
        console.log('\n=== Python ===');
        let result = await sandbox.runCode('print(2 + 2)', { language: 'python' });
        console.log('Output:', result.stdout.trim());

        result = await sandbox.runCode('x = 10\ny = 20\nprint(x + y)', { language: 'python' });
        console.log('Output:', result.stdout.trim());

        result = await sandbox.runCode('numbers = [1, 2, 3, 4, 5]\nprint(sum(numbers))', { language: 'python' });
        console.log('Output:', result.stdout.trim());

        console.log('\n=== JavaScript ===');
        result = await sandbox.runCode('console.log("Hello from JS")', { language: 'javascript' });
        console.log('Output:', result.stdout.trim());

        result = await sandbox.runCode(
            'const arr = [1, 2, 3];\nconsole.log(arr.reduce((a, b) => a + b, 0))',
            { language: 'javascript' }
        );
        console.log('Output:', result.stdout.trim());

        console.log('\n=== Multiple Snippets (Independent) ===');
        const snippets = [
            { code: 'print(2 ** 10)', language: 'python' as const },
            { code: 'import math\nprint(math.factorial(5))', language: 'python' as const },
            { code: 'print([x * 2 for x in range(5)])', language: 'python' as const }
        ];

        for (let i = 0; i < snippets.length; i += 1) {
            const { code, language } = snippets[i];
            const res = await sandbox.runCode(code, { language });
            console.log(`Snippet ${i + 1} output:`, res.stdout.trim());
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sandbox.remove();
        console.log('\n✓ Sandbox removed');
    }
}

main().catch(console.error);
