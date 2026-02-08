#!/usr/bin/env node
/**
 * Post-process ESM .js files to add .js extensions to relative imports
 * This is required for proper ESM module resolution in Node.js
 */
const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '../dist/esm');

function fixEsmImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add .js extension to relative imports that don't have it
    // Matches: from './xxx' or from "./xxx" or from './xxx/index'
    // But not: from './xxx.js' or from '@package'
    const oldContent = content;
    
    content = content.replace(
        /from\s+['"](\.[^'"]+(?<!\.js|\.mjs|\.cjs|\.json|\.d\.ts))['"];/g,
        (match, importPath) => `from '${importPath}.js';`
    );
    
    if (content !== oldContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

function processEsmDir(dir) {
    const files = fs.readdirSync(dir);
    let count = 0;
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            count += processEsmDir(fullPath);
        } else if (file.endsWith('.js') && !file.endsWith('.d.ts')) {
            if (fixEsmImports(fullPath)) {
                count++;
            }
        }
    }
    return count;
}

try {
    if (fs.existsSync(esmDir)) {
        const filesFixed = processEsmDir(esmDir);
        console.log(`✓ ESM build post-processing complete (${filesFixed} files updated)`);
    } else {
        console.log('⚠ dist/esm directory not found');
    }
} catch (err) {
    console.error('✗ Error processing ESM files:', err.message);
    process.exit(1);
}
