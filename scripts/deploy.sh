#!/bin/bash
set -e

# Change to your app directory 
cd ~/audiophile-node-api

# Ensure you're on the main branch
git checkout main

# Pull the latest changes
git pull origin main

# Install dependencies and build the app if needed
npm install
npm run build

# Restart the app using PM2 (or start it if not already running)
pm2 restart ./bin/www || pm2 start ./bin/www --name audiophile-api