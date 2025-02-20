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

# # Check if package.json has changed
# if git diff --name-only HEAD~1 | grep -q "package.json"; then
#   echo "package.json has changed. Committing package-lock.json..."
  
#   # Commit package-lock.json
#   git add package-lock.json
#   git commit -m "Updated dependencies and package-lock.json"
# else
#   echo "package.json has not changed. Skipping commit."
# fi

 # Commit package-lock.json
  git add package-lock.json
  git commit -m "Updated dependencies and package-lock.json"

# Pull the latest changes
echo "Pulling latest changes from origin/main..."
git push origin main

# Install dependencies and build the app if needed
echo "Installing deps.."
npm install

# Restart the app using PM2 (or start it if not already running)
echo "Restarting..."
pm2 restart ./bin/www || pm2 start ./bin/www --name audiophile-api