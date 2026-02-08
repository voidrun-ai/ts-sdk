import { VoidRun } from '../src/index.js';

/**
 * Comprehensive Code Execution Test Suite
 *
 * The `runCode()` API is stateless per call, so each snippet should be
 * complete on its own (no shared variables between calls).
 */
async function main() {
    const vr = new VoidRun({});
    let sandbox;

    try {
        console.log('🚀 Creating sandbox...');
        sandbox = await vr.createSandbox({
            name: 'code-interpreter-test',
            cpu: 1,
            mem: 1024
        });
        console.log(`✓ Sandbox created: ${sandbox.id}\n`);

        const run = async (label: string, code: string, language: 'python' | 'javascript' | 'bash') => {
            console.log(`> ${label}`);
            const result = await sandbox.runCode(code, { language });
            console.log(`Output: ${result.stdout.trim()}`);
            console.log(`Success: ${result.success}\n`);
            return result;
        };

        console.log('='.repeat(50));
        console.log('📊 Test 1: Python');
        console.log('='.repeat(50));

        await run('2 + 2', 'print(2 + 2)', 'python');
        await run('x = 10; y = 20; print(x + y)', 'x = 10\ny = 20\nprint(x + y)', 'python');
        await run('List comprehension', 'numbers = [1,2,3,4,5]\nprint([x**2 for x in numbers])', 'python');
        await run('String operations', 'text = "Hello, World!"\nprint(text.upper())\nprint(len(text))', 'python');

        console.log('='.repeat(50));
        console.log('💻 Test 2: JavaScript');
        console.log('='.repeat(50));

        await run('console.log(2 + 2)', 'console.log(2 + 2)', 'javascript');
        await run('Array.map', 'const arr = [1,2,3,4,5];\nconsole.log(arr.map(x => x * 2));', 'javascript');
        await run('Object stringify', 'const obj = {name: "VoidRun", version: "1.0"};\nconsole.log(JSON.stringify(obj));', 'javascript');

        console.log('='.repeat(50));
        console.log('🐚 Test 3: Bash');
        console.log('='.repeat(50));

        await run('echo "Hello from Bash"', 'echo "Hello from Bash"', 'bash');
        await run('echo $((2 + 2))', 'echo $((2 + 2))', 'bash');

        console.log('='.repeat(50));
        console.log('🔄 Test 4: Multiple Snippets (Independent)');
        console.log('='.repeat(50));

        const snippets = [
            'def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)\nprint(factorial(5))',
            'numbers = list(range(1, 6))\nprint(sum(numbers))',
            'print([x * 2 for x in range(5)])'
        ];

        for (let i = 0; i < snippets.length; i += 1) {
            const res = await sandbox.runCode(snippets[i], { language: 'python' });
            console.log(`Snippet ${i + 1} output: ${res.stdout.trim()}`);
        }

        console.log('\n' + '='.repeat(50));
        console.log('⚠️  Test 5: Error Handling');
        console.log('='.repeat(50) + '\n');

        const errResult = await sandbox.runCode('invalid python syntax !@#$', { language: 'python' });
        console.log(`Success: ${errResult.success}`);
        if (!errResult.success) {
            console.log(`Error: ${errResult.stderr.substring(0, 100)}...`);
        }

        console.log('\n' + '='.repeat(50));
        console.log('✅ All Tests Completed Successfully!');
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        if (sandbox) {
            console.log('🧹 Cleaning up...');
            await sandbox.remove();
            console.log('✓ Sandbox removed');
        }
    }
}

main().catch(console.error);
