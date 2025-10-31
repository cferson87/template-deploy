#!/bin/bash
# Manual sync script to push all changes to GitHub

echo "Syncing to GitHub..."
echo ""

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Found uncommitted changes. Creating commit..."
    git add -A
    git commit -m "Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "✓ No uncommitted changes"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Successfully synced to GitHub!"
    echo "View at: https://github.com/cferson87/template-deploy"
else
    echo ""
    echo "✗ Failed to sync to GitHub"
    exit 1
fi
