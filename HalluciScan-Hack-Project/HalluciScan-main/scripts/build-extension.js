/**
 * Build script for HalluciScan Chrome Extension
 * Creates a zip file at public/halluciscan-extension.zip
 * 
 * Usage: npm run build-extension
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const extensionDir = path.join(__dirname, '..', 'extension');
const outputPath = path.join(__dirname, '..', 'public', 'halluciscan-extension.zip');

// Ensure public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Remove old zip if exists
if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ Extension packaged successfully!`);
  console.log(`   Output: ${outputPath}`);
  console.log(`   Size: ${(archive.pointer() / 1024).toFixed(1)} KB`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add all extension files
archive.directory(extensionDir, false);

archive.finalize();
