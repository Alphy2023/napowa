#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('[v0] Setting up Prisma...');

try {
  // Generate Prisma client
  console.log('[v0] Generating Prisma client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  
  console.log('[v0] Prisma client generated successfully');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error setting up Prisma:', error.message);
  process.exit(1);
}
