import { VoidRun } from '../src/index.js';

async function main() {
  const vr = new VoidRun({});

  console.log('--- Advanced Sandbox Construction ---');

  const sandboxName = 'advanced-sdbx-' + Math.floor(Math.random() * 1000);

  console.log(`Creating sandbox ${sandboxName} in region 'us'...`);

  const sandbox = await vr.createSandbox({
    name: sandboxName,
    autoSleep: false,
    envVars: {
      APP_ENV: 'production',
      DEBUG: 'false',
    },
  });

  try {
    console.log('\nSandbox Metadata:');
    console.log(`- ID: ${sandbox.id}`);
    console.log(`- Name: ${sandbox.name}`);
    console.log(`- Region: ${sandbox.region}`);
    console.log(`- AutoSleep: ${sandbox.autoSleep}`);

    console.log('\n--- Pagination Test ---');
    console.log('Listing sandboxes (page 1, limit 2)...');
    const listResult = await vr.listSandboxes({ page: 1, limit: 2 });

    console.log(`Found ${listResult.sandboxes.length} sandboxes on this page.`);
    console.log(`Total sandboxes: ${listResult.meta.total}`);
    console.log(`Total pages: ${listResult.meta.totalPages}`);

    listResult.sandboxes.forEach((s, i) => {
      console.log(`  ${i + 1}. ${s.name} (${s.id})`);
    });
  } finally {
    console.log('\nCleaning up...');
    await sandbox.remove();
    console.log('Cleanup complete.');
  }
}

main().catch(console.error);
