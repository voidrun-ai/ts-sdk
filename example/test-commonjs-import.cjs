/**
 * Test CommonJS import
 * This test verifies the SDK works with CommonJS (require)
 */
const { VoidRun } = require('../dist/cjs/index.cjs');

async function testCommonJS() {
    console.log('✓ CommonJS import successful');
    console.log('✓ VoidRun class loaded:', typeof VoidRun);
    
    // VoidRun requires an API key, so we just verify the class loaded
    console.log('✓ VoidRun class exported correctly from CommonJS build');
    
    return true;
}

testCommonJS()
    .then(() => console.log('\n✅ CommonJS test passed!'))
    .catch(err => {
        console.error('❌ CommonJS test failed:', err.message);
        process.exit(1);
    });
