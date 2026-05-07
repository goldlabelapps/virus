/**
 * Minimal build script using Node.js built-ins.
 *
 * Copies the package entrypoint to:
 *   dist/index.js   - ESM build
 *   dist/index.cjs  - CommonJS build
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = join(__dirname, '..', 'src');
const distDir = join(__dirname, '..', 'dist');

mkdirSync(distDir, { recursive: true });

const entrySource = readFileSync(join(srcDir, 'index.js'), 'utf8').trimEnd();

// ESM bundle
const esmBundle = `${entrySource}\n`;
writeFileSync(join(distDir, 'index.js'), esmBundle, 'utf8');

// Type declarations for TypeScript consumers.
const dtsBundle = `export declare const PACKAGE_NAME: string;\nexport declare const PACKAGE_VERSION: string;\nexport declare function renderPackageInfo(): string;\n`;
writeFileSync(join(distDir, 'index.d.ts'), dtsBundle, 'utf8');

// CommonJS bundle: strip `export` keywords from declarations and
// collect exported symbol names for module.exports.
const exportedNames = [];
for (const m of esmBundle.matchAll(/^export (?:class|function|const|let|var) (\w+)/gm)) {
  exportedNames.push(m[1]);
}

let cjsBundle = esmBundle.replace(/^export (class|function|const|let|var) /gm, '$1 ');
cjsBundle += `\nmodule.exports = { ${[...new Set(exportedNames)].join(', ')} };\n`;
writeFileSync(join(distDir, 'index.cjs'), cjsBundle, 'utf8');

console.log('Build complete → dist/index.js (ESM), dist/index.cjs (CJS), and dist/index.d.ts (types)');
