import { VoidRun } from '../src/index.js';

async function testEmptyProcessList() {
  const client = new VoidRun({});
  
  console.log('\n=== Test: Empty Process List ===');
  
  try {
    // Create a fresh sandbox
    console.log('Creating sandbox...');
    const sandbox = await client.createSandbox({ name: 'test-empty-processes' });
    console.log(`✓ Sandbox created: ${sandbox.id}`);
    
    // Wait for sandbox to be ready
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // List processes (should be empty array, not null)
    console.log('\nListing processes...');
    const response = await sandbox.commands.list();
    console.log('Raw processes response:', JSON.stringify(response, null, 2));
    
    if (response.processes === null) {
      console.error('❌ FAIL: response.processes is null (should be empty array [])');
    } else if (Array.isArray(response.processes) && response.processes.length === 0) {
      console.log('✅ PASS: response.processes is empty array []');
    } else {
      console.error('❌ FAIL: Unexpected response.processes value:', response.processes);
    }
    
    // Run a quick command that completes
    console.log('\nRunning command: echo "test"');
    const runResponse = await sandbox.commands.run('echo "test"');
    console.log(`✓ Command started: PID ${runResponse.pid}`);
    
    // Wait for it to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // List again - should still be empty (finished processes are pruned)
    console.log('\nListing processes again (after command completion)...');
    const responseAfter = await sandbox.commands.list();
    console.log('Raw processes response:', JSON.stringify(responseAfter, null, 2));
    
    if (responseAfter.processes === null) {
      console.error('❌ FAIL: response.processes is null (should be empty array [])');
    } else if (Array.isArray(responseAfter.processes) && responseAfter.processes.length === 0) {
      console.log('✅ PASS: response.processes is still empty array [] (finished processes pruned)');
    } else {
      console.error('❌ FAIL: Unexpected response.processes value:', responseAfter.processes);
    }
    
    // Cleanup
    console.log('\nCleaning up...');
    await sandbox.remove();
    console.log('✓ Sandbox deleted');
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

testEmptyProcessList()
  .then(() => {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
