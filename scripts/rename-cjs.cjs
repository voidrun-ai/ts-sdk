#!/usr/bin/env node
/**
 * Rename CommonJS .js files to .cjs for proper module resolution
 * and update imports to reference .cjs files instead of .js
 */
const fs = require('fs');
const path = require('path');

const cjsDir = path.join(__dirname, '../dist/cjs');

function updateImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace require('./xxx.js') with require('./xxx.cjs')
    content = content.replace(/require\(["']([^"']+)\.js["']\)/g, (match, p1) => {
        // Don't replace .d.ts imports
        if (p1.includes('.d.ts')) return match;
        return `require("${p1}.cjs")`;
    });
    
    // Also handle mapped imports like require("./api-client")
    content = content.replace(/require\(["'](\.[^"']+)["']\)/g, (match, p1) => {
        if (!p1.endsWith('.cjs') && !p1.endsWith('.d.ts')) {
            return `require("${p1}.cjs")`;
        }
        return match;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function processCjsDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processCjsDir(fullPath);
        } else if (file.endsWith('.js') && !file.endsWith('.d.ts')) {
            // Update imports in the file before renaming
            updateImports(fullPath);
            
            const newPath = fullPath.replace(/\.js$/, '.cjs');
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed: ${file} → ${path.basename(newPath)}`);
        }
    }
}

try {
    if (fs.existsSync(cjsDir)) {
        processCjsDir(cjsDir);
        console.log('✓ CommonJS build post-processing complete');
    } else {
        console.log('⚠ dist/cjs directory not found');
    }
} catch (err) {
    console.error('✗ Error processing files:', err.message);
    process.exit(1);
}
