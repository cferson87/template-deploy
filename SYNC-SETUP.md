# GitHub Sync Setup

Your local repository is now configured to automatically sync with GitHub!

**Repository URL:** https://github.com/cferson87/template-deploy

## Automatic Sync Options

### 1. Auto-Push After Every Commit (ACTIVE)
A git hook automatically pushes changes to GitHub after each `git commit`.

**How it works:**
- Every time you run `git commit`, changes are immediately pushed to GitHub
- You'll see confirmation messages after each commit
- No additional action needed!

### 2. Manual Sync Script
Run this script anytime to sync all changes:

```bash
./sync-to-github.sh
```

**What it does:**
- Checks for uncommitted changes
- Creates a commit if needed
- Pushes everything to GitHub

### 3. Schedule Automatic Syncing (Optional)

If you want periodic automatic syncing every X hours/minutes, you can set up a cron job:

```bash
# Edit crontab
crontab -e

# Add one of these lines:

# Sync every hour:
0 * * * * cd /Users/craig/Desktop/Projects && ./sync-to-github.sh >> sync.log 2>&1

# Sync every 30 minutes:
*/30 * * * * cd /Users/craig/Desktop/Projects && ./sync-to-github.sh >> sync.log 2>&1

# Sync every 4 hours:
0 */4 * * * cd /Users/craig/Desktop/Projects && ./sync-to-github.sh >> sync.log 2>&1
```

## Recommended Approach

**Option 1 (Current Setup)** is recommended for most use cases:
- Automatic sync after every commit
- No scheduled jobs needed
- Clean commit history
- Immediate backup to GitHub

## Testing the Setup

To verify everything is working:

```bash
# Make a test change
echo "test" > test.txt

# Commit it
git add test.txt
git commit -m "Test auto-sync"

# You should see "Pushing changes to GitHub..." and success message

# Clean up
git rm test.txt
git commit -m "Remove test file"
```

## Troubleshooting

If auto-push fails:
1. Check your internet connection
2. Verify GitHub authentication: `/opt/homebrew/bin/gh auth status`
3. Manually push: `git push origin main`
4. Check the hook is executable: `ls -l .git/hooks/post-commit`
