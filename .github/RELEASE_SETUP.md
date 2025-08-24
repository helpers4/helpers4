# GitHub Action Release Configuration

## Required Repository Secrets

To use the release GitHub Action, you need to set up the following secrets in your GitHub repository:

### NPM_TOKEN
1. Go to [npmjs.com](https://www.npmjs.com)
2. Log in to your account
3. Go to "Access Tokens" in your account settings
4. Create a new token with "Automation" type
5. Copy the token

In your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Your NPM token
5. Click "Add secret"

### GITHUB_TOKEN
This is automatically provided by GitHub Actions - no setup required.

## Setting up NPM Organization Access

If publishing to an NPM organization (like `@helpers4/`):
1. Ensure your NPM token has access to the organization
2. Make sure the organization allows automation tokens
3. Verify package names match your organization scope

## Testing the Setup

Before running a production release:

1. **Validate locally**:
   ```bash
   bun run release:validate
   ```

2. **Test dry run**:
   ```bash
   bun run release:dry-run
   ```

3. **Test GitHub Action**:
   - Use a test branch
   - Run the workflow with prerelease version type
   - Verify all steps complete successfully

## Troubleshooting

### NPM Authentication Fails
- Check NPM_TOKEN is correctly set
- Verify token has publish permissions
- Check token hasn't expired

### Git Push Fails
- Ensure branch protection rules allow workflow pushes
- Check repository permissions
- Verify GITHUB_TOKEN has write access

### Build Fails
- Test build locally: `bun run build`
- Check TypeScript errors
- Verify all dependencies are installed

For more details, see `.ci/RELEASE.md`
