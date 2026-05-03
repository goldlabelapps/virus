/**
 * Minimal build script using Node.js built-ins.
 *
 * Concatenates all source files into:
 *   dist/index.js   – ESM bundle
 *   dist/index.cjs  – CommonJS bundle
 *
 * For a production package you would replace this with esbuild / tsup / rollup.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcDir = join(__dirname, '..', 'src');
const distDir = join(__dirname, '..', 'dist');

mkdirSync(distDir, { recursive: true });

// Build in dependency order; index.js is handled separately (re-exports only).
const order = ['Virus.js', 'Population.js', 'Simulation.js'];

let esmParts = [];
const exportedNames = [];

for (const file of order) {
  let content = readFileSync(join(srcDir, file), 'utf8');
  // Remove inter-file import statements (they are inlined).
  content = content.replace(/^import .+ from '\.\/.*';\n?/gm, '');
  // Collect exported class / function / const names.
  for (const m of content.matchAll(/^export (?:class|function|const|let|var) (\w+)/gm)) {
    exportedNames.push(m[1]);
  }
  esmParts.push(content.trimEnd());
}

// ── ESM bundle ──────────────────────────────────────────────────────────────
const esmBundle = esmParts.join('\n\n') + '\n';
writeFileSync(join(distDir, 'index.js'), esmBundle, 'utf8');

// ── CJS bundle ───────────────────────────────────────────────────────────────
// Strip `export` keywords from declarations so they are plain identifiers,
// then add a single module.exports at the bottom.
let cjsBundle = esmBundle.replace(/^export (class|function|const|let|var) /gm, '$1 ');
cjsBundle += `\nmodule.exports = { ${[...new Set(exportedNames)].join(', ')} };\n`;
writeFileSync(join(distDir, 'index.cjs'), cjsBundle, 'utf8');

console.log('Build complete → dist/index.js (ESM) and dist/index.cjs (CJS)');
