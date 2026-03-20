import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('[v0] Generating Prisma Client...');
try {
  execSync('npx prisma generate', { 
    cwd: projectRoot, 
    stdio: 'inherit' 
  });
  console.log('[v0] Prisma Client generated successfully');
} catch (error) {
  console.error('[v0] Error generating Prisma Client:', error.message);
  process.exit(1);
}
