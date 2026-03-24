import { VoidRun } from '../src/index.js';

async function main() {
  const vr = new VoidRun({});

  console.log('Creating sandbox...');
  const sbx = await vr.createSandbox({
    name: 'test-ts-exec',
  });

  console.log(`Sandbox created: ${sbx.id}\n`);

  try {
    console.log('=== Test: TypeScript Execution ===');
    const tsResult = await sbx.runCode(
      `interface User {
                name: string;
                age: number;
            }
            
            const user: User = { name: "Alice", age: 30 };
            console.log(\`User \${user.name} is \${user.age} years old.\`);
            
            function factorial(n: number): number {
                if (n <= 1) return 1;
                return n * factorial(n - 1);
            }
            
            console.log(\`Factorial of 5 is \${factorial(5)}\`);
            user;`,
      {
        language: 'typescript',
        onError: (error) => console.error('Caught error:', error.message),
      },
    );
    console.log('Results:', tsResult.results);
    console.log('Success:', tsResult.success);
    console.log('Stdout:', tsResult.stdout);
    console.log('Stderr:', tsResult.stderr);
    console.log('');
  } finally {
    console.log('Cleaning up sandbox...');
    await sbx.remove();
    console.log('✅ Done!');
  }
}

main().catch(console.error);
