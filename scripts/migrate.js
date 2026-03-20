#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function migrate() {
  try {
    console.log('Running Prisma migrations...');
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy', {
      cwd: process.cwd()
    });
    console.log(stdout);
    if (stderr) console.error(stderr);

    console.log('\nGenerating Prisma client...');
    const { stdout: genStdout, stderr: genStderr } = await execAsync('npx prisma generate', {
      cwd: process.cwd()
    });
    console.log(genStdout);
    if (genStderr) console.error(genStderr);

    console.log('\n✓ Migration and client generation complete!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
