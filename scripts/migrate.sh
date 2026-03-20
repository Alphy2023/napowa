#!/bin/bash

# Prisma migration script
cd "$(dirname "$0")/.."

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate

echo "Migration and client generation complete!"
