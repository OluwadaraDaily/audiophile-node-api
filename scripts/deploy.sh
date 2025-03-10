#!/bin/bash
set -e

# Change to your app directory 
echo "Changing to app dir..."
cd ~/audiophile-node-api

# Ensure you're on the main branch
echo "Checking out to main branch..."
git checkout main

# Set git config to allow for pulling
git config --global pull.rebase false

# Pull the latest changes
echo "Pulling latest changes from origin/main..."
git pull origin main

# Install dependencies and build the app if needed
echo "Installing deps.."
npm install

# Restart the app using PM2 (or start it if not already running)
echo "Restarting..."
pm2 restart ./bin/www || pm2 start ./bin/www --name audiophile-api