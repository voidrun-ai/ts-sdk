/**
 * Test ESM import
 * This test verifies the SDK works with ES modules (import)
 */
import { VoidRun } from '../dist/esm/index.js';

async function testESM() {
    console.log('✓ ESM import successful');
    console.log('✓ VoidRun class loaded:', typeof VoidRun);
    
    // VoidRun requires an API key, so we just verify the class loaded
    console.log('✓ VoidRun class exported correctly from ESM build');
    
    return true;
}

testESM()
    .then(() => console.log('\n✅ ESM test passed!'))
    .catch(err => {
        console.error('❌ ESM test failed:', err.message);
        process.exit(1);
    });
