# GitHub Actions and Automation Prompts

This file contains specialized prompts and context for GitHub Copilot to assist with CI/CD, automation, and GitHub Actions development in the Helpers4 project.

## GitHub Actions Context

### Workflow Structure
The project uses multiple GitHub Actions workflows:

1. **Release Workflow** (`release.yml`)
   - Manual dispatch trigger with version type selection
   - Automated version bumping using conventional commits
   - Complete build, test, and publish pipeline
   - NPM package publishing with transaction safety

2. **PR Validation Workflow** (`pr-validation.yml`)
   - Triggers on PR events (opened, synchronize, reopened)
   - Multi-matrix Node.js testing (versions 18, 20, 22)
   - Security scanning and vulnerability assessment
   - Conventional commit validation
   - Automated PR status commenting

### Security Considerations
- **External Contributors**: Special handling for `pull_request_target` events
- **Permission Scoping**: Minimal required permissions for each job
- **Token Management**: GitHub App tokens for elevated permissions
- **Secret Scanning**: Automated detection of sensitive data patterns

## Automation Prompts

### When Adding New GitHub Actions
Ask Copilot to:
- "Create a GitHub Action workflow for [specific purpose] following the project's security practices"
- "Add caching strategies to improve workflow performance"
- "Implement matrix testing for multiple Node.js versions"
- "Add security scanning steps to the existing workflow"

### When Modifying CI/CD
Ask Copilot to:
- "Update the PR validation workflow to include [new check]"
- "Add conditional job execution based on changed files"
- "Implement artifact caching for build outputs"
- "Create a workflow for automated dependency updates"

### When Debugging Workflows
Ask Copilot to:
- "Analyze the workflow failure and suggest fixes"
- "Add debugging steps to troubleshoot [specific issue]"
- "Optimize workflow execution time while maintaining security"
- "Review workflow permissions and suggest minimal required scope"

## Script Automation Context

### Build System
The project uses TypeScript-based automation scripts:

```typescript
// Example build script structure
export interface BuildOptions {
  target: 'development' | 'production';
  packages?: string[];
  watch?: boolean;
}

export async function buildPackages(options: BuildOptions): Promise<void> {
  // Implementation
}
```

### Version Management
Automated versioning with conventional commits:

```typescript
// Example version management
export type VersionType = 'patch' | 'minor' | 'major' | 'prerelease';

export async function bumpVersion(type: VersionType): Promise<string> {
  // Implementation using conventional commit analysis
}
```

### Publication Process
Transaction-safe NPM publishing:

```typescript
// Example publication safety
export async function publishPackages(packages: PackageInfo[]): Promise<void> {
  // Validate all packages first
  // Publish with rollback capability
  // Verify publication success
}
```

## Workflow Patterns

### Conditional Execution
```yaml
# Execute job only if specific files changed
if: contains(steps.changes.outputs.files, 'helpers/')

# Skip job for specific conditions
if: github.actor != 'dependabot[bot]'

# Matrix conditions
if: matrix.node-version == '18'
```

### Security Patterns
```yaml
# Safe external PR handling
if: |
  github.event_name == 'pull_request' || 
  (github.event_name == 'pull_request_target' && 
   github.event.pull_request.head.repo.full_name == github.repository)

# Minimal permissions
permissions:
  contents: read
  pull-requests: write
  checks: write
```

### Performance Optimization
```yaml
# Dependency caching
- uses: actions/cache@v4
  with:
    path: |
      ~/.bun/install/cache
      node_modules
    key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}

# Parallel job execution
strategy:
  matrix:
    node-version: [18, 20, 22]
  fail-fast: false
```

## Testing Automation

### Test Categories
1. **Unit Tests**: Individual function testing
2. **Integration Tests**: Package interaction testing
3. **Performance Tests**: Benchmark validation
4. **Security Tests**: Vulnerability scanning
5. **Coherency Tests**: Package consistency validation

### Test Execution Patterns
```bash
# Run specific test categories
bun test helpers/**/*.test.ts
bun run coherency
bun audit

# Performance benchmarking
bun test --coverage
bun run build && du -sh build/*
```

## Monitoring and Observability

### Workflow Monitoring
- **Job Success/Failure Rates**: Track CI/CD reliability
- **Execution Time**: Monitor performance degradation
- **Resource Usage**: Optimize runner efficiency
- **Security Alerts**: Monitor vulnerability findings

### Build Metrics
- **Bundle Size Tracking**: Monitor package size growth
- **Test Coverage**: Maintain coverage thresholds
- **Build Time**: Optimize build performance
- **Dependency Health**: Track dependency updates and security

## Common Automation Tasks

### Release Automation
```yaml
# Conventional release process
- name: Generate changelog
  run: conventional-changelog -p angular -i CHANGELOG.md -s

- name: Bump version
  run: bun run version:auto

- name: Build packages
  run: bun run build

- name: Publish packages
  run: bun run publish
```

### Quality Gates
```yaml
# Quality validation pipeline
- name: Type checking
  run: bun run tsc --noEmit

- name: Linting
  run: bun run lint

- name: Test suite
  run: bun run test

- name: Security audit
  run: bun audit
```

### Notification Patterns
```yaml
# PR status updates
- name: Update PR status
  uses: actions/github-script@v7
  with:
    script: |
      // Update PR with validation results
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: 'Validation completed successfully! ✅'
      });
```

This context helps GitHub Copilot understand the automation patterns, security considerations, and best practices for maintaining and extending the CI/CD infrastructure of the Helpers4 project.
