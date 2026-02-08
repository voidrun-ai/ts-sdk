import { VoidRun } from '../src/index.js';

async function main() {
    const vr = new VoidRun({});

    console.log('Creating sandbox...');
    const sbx = await vr.createSandbox({
        name: 'test-runcode',
    });

    console.log(`Sandbox created: ${sbx.id}\n`);

    try {
        // Test 1: Python code (standard library only)
        console.log('=== Test 1: Python (standard library) ===');
        const tt = await sbx.runCode(`import math
    print(sum([1, 2, 3, 4]))
    print(math.sqrt(81))`);

        console.log('Results:', tt.results);
        console.log('Success:', tt.success);
        console.log('Stdout:', tt.stdout);
        console.log('Stderr:', tt.stderr);
        console.log('');

        // Test 2: JavaScript factorial with handlers
        console.log('=== Test 2: JavaScript factorial ===');
        const r = await sbx.runCode(
            `function factorial(n) {
                if (n === 0) return 1;
                return n * factorial(n - 1);
            }
            factorial(6);`,
            {
                language: 'javascript',
                onError: (error) => console.error('error:', error),
                onStdout: (data) => console.log('stdout:', data),
                onStderr: (data) => console.error('stderr:', data),
            }
        );

        console.log('Results:', r.results);
        console.log('Success:', r.success);
        console.log('');

        // Test 3: Simple Python expression
        console.log('=== Test 3: Simple Python ===');
        const py = await sbx.runCode('print("Hello from Python")\nprint(2 + 2)');
        console.log('Results:', py.results);
        console.log('Stdout:', py.stdout);
        console.log('');

        // Test 4: Bash command
        console.log('=== Test 4: Bash command ===');
        const bash = await sbx.runCode('echo "Current dir: $(pwd)" && ls -la', {
            language: 'bash',
        });
        console.log('Results:', bash.results);
        console.log('Stdout:', bash.stdout);
        console.log('');

        // Test 5: Python with error
        console.log('=== Test 5: Python with error ===');
        const err = await sbx.runCode('print(undefined_variable)', {
            onError: (error) => console.error('Caught error:', error.message),
        });
        console.log('Success:', err.success);
        console.log('Error:', err.error);
        console.log('');

    } finally {
        console.log('Cleaning up sandbox...');
        await sbx.remove();
        console.log('✅ Done!');
    }
}

main().catch(console.error);
