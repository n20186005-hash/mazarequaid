// One-off cleanup of leftover pnpm tmp folders.
// Run via: node --no-warnings scripts/cleanup-pnpm-tmp.mjs
import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const roots = [
  'H:/GitHub/mazarequaid/node_modules/.pnpm',
  'C:/Users/dcc/AppData/Local/pnpm',
];

async function sweep(root) {
  try {
    const entries = await readdir(root, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (!entry.name.includes('_tmp_')) continue;
      const full = join(root, entry.name);
      try {
        await rm(full, { recursive: true, force: true });
        console.log('removed', full);
      } catch (error) {
        console.warn('skip', full, error.message);
      }
    }
    // Walk one level deeper for nested tmp folders
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const inner = join(root, entry.name, 'node_modules');
      try {
        const subEntries = await readdir(inner, { withFileTypes: true });
        for (const sub of subEntries) {
          if (!sub.isDirectory()) continue;
          if (!sub.name.includes('_tmp_')) continue;
          const full = join(inner, sub.name);
          try {
            await rm(full, { recursive: true, force: true });
            console.log('removed', full);
          } catch (error) {
            console.warn('skip', full, error.message);
          }
        }
      } catch (_error) {
        // ignore missing nested dirs
      }
    }
  } catch (error) {
    console.warn('skip root', root, error.message);
  }
}

for (const root of roots) {
  await sweep(root);
}
console.log('cleanup complete');