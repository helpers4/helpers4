# Version Management and Publishing System

This document describes the enhanced version management and publishing system for helpers4.

## 🔄 Version Management

### Automatic Version Calculation

The system can now automatically calculate the appropriate version type based on git commit history using conventional commits:

```bash
# Auto-calculate version from commits
bun run version:auto

# Preview auto-calculation without changes
bun run version:auto-dry
```

#### Conventional Commit Analysis

- `feat: new feature` → **minor** version bump
- `fix: bug fix` → **patch** version bump  
- `feat!: breaking change` or `BREAKING CHANGE:` → **major** version bump
- Other commits → **patch** version bump

### Manual Version Types

```bash
# Explicit version types
bun run version:patch      # 2.0.0-alpha.0 → 2.0.0
bun run version:minor      # 2.0.0 → 2.1.0
bun run version:major      # 2.0.0 → 3.0.0
bun run version:prerelease # 2.0.0 → 2.0.1-alpha.0
```

### Advanced Usage

```bash
# Update only root package (skip build packages)
bun .ci/version/version-manager.ts patch --no-build

# Custom root directory
bun .ci/version/version-manager.ts minor --root /path/to/project

# Dry run with auto-calculation
bun .ci/version/version-manager.ts --auto --dry-run
```

## 📦 Enhanced Publishing System

### New Features

- **Transactional Publishing**: Automatic rollback on failure
- **Smart Package Discovery**: Automatic detection of categories and bundles
- **Validation System**: Pre-publish package structure validation
- **Retry Logic**: Automatic retries with exponential backoff
- **Order Management**: Categories published before bundles

### Basic Usage

```bash
# Publish all packages
bun run publish

# Test publishing without actually publishing
bun run publish:dry-run
```

### Advanced Publishing Options

```bash
# Custom configuration
bun .ci/publish/ --dry-run --access public --tag beta --category-delay 30

# Skip validation for faster publishing
bun .ci/publish/ --skip-validation

# Custom retry configuration
bun .ci/publish/ --retries 5 --retry-delay 10

# Verbose logging
bun .ci/publish/ --verbose

# Custom build directory
bun .ci/publish/ --build-dir ./custom-build
```

### Publishing Strategy

1. **Phase 1**: Category packages (`@helpers4/array`, `@helpers4/string`, etc.)
2. **Wait**: Configurable delay (default 60s) for NPM registry propagation
3. **Phase 2**: Bundle packages (`@helpers4/all`)

### Transaction Safety

- Failed publishes trigger automatic rollback
- Published packages are deprecated with clear messages
- No partial states left in registry

## 🚀 Complete Release Process

### Automatic Release

```bash
# Auto-calculate version and release
bun run release:auto

# Test the entire release process
bun run release:auto --dry-run
```

### Manual Release

```bash
# Specific version types
bun run release:patch
bun run release:minor
bun run release:major
bun run release:prerelease
```

### Release Process Steps

1. **Pre-flight checks**: Working directory, branch, authentication
2. **Tests**: Run test suite
3. **Version Update**: Calculate and update version numbers
4. **Build**: Build all packages
5. **Coherency Tests**: Validate package integrity
6. **Git Operations**: Commit changes and create tags
7. **Publishing**: Publish to NPM registry

### Release Options

```bash
# Skip specific steps
bun .ci/version/release.ts patch --skip-tests --skip-build

# Target specific branch
bun .ci/version/release.ts minor --branch develop

# Full dry run
bun .ci/version/release.ts --auto --dry-run
```

## 🔍 Pre-Release Validation

Before running a release, validate your environment:

```bash
# Comprehensive validation
bun run release:validate
```

Checks:
- Environment setup (Node.js, Bun, Git)
- Repository status and cleanliness
- Dependencies and package.json structure
- Build and test processes
- Coherency tests

## 🧪 Testing and Development

### Dry Run Everything

```bash
# Test version calculation
bun run version:auto-dry

# Test publishing
bun run publish:dry-run

# Test complete release
bun run release:auto --dry-run
```

### Validation and Debugging

```bash
# Validate environment
bun run release:validate

# Check coherency
bun run coherency

# Test build
bun run build
```

## 📊 Configuration Examples

### Environment Variables

```bash
# For automated environments
export CI=true
export AUTOMATED=true

# Enable debug output
export DEBUG=true
export VERBOSE=true
```

### NPM Configuration

```bash
# Set NPM registry
bun .ci/publish/ --registry https://custom-registry.com

# Use different access level
bun .ci/publish/ --access restricted

# Custom tag
bun .ci/publish/ --tag beta
```

### Git Configuration

```bash
# Target different branch
bun .ci/version/release.ts patch --branch feature/new-release

# Custom commit message format
# (configured in release.ts)
```

## 🛠️ Troubleshooting

### Common Issues

**Version Calculation Fails**
```bash
# Ensure git repository has commits
git log --oneline

# Check conventional commit format
git log --oneline --grep="^feat\|^fix\|^BREAKING"
```

**Publishing Fails**
```bash
# Check NPM authentication
npm whoami

# Validate package structure
bun .ci/publish/ --dry-run

# Skip validation if packages are known good
bun .ci/publish/ --skip-validation
```

**Coherency Tests Fail**
```bash
# Run coherency tests separately
bun run coherency

# Check specific test failures in output
```

### Recovery Commands

**Revert Version Changes**
```bash
git checkout HEAD -- package.json build/*/package.json
```

**Rollback Published Packages** (handled automatically)
```bash
# The system automatically deprecates failed releases
npm deprecate @helpers4/package@version "Release failed"
```

## 📁 File Structure

```
.ci/
├── version/
│   ├── version-manager.ts        # Version calculation and updating
│   ├── commit-analyzer.ts        # Git commit analysis  
│   ├── git-utils.ts             # Git operations
│   ├── release.ts               # Complete release orchestration
│   └── pre-release-validator.ts # Pre-release validation
├── publish/
│   ├── index.ts                 # Main publishing script
│   └── helpers/
│       ├── npm-utils.ts         # NPM operations
│       ├── package-discovery.ts # Package detection
│       └── transaction-manager.ts # Transaction handling
└── coherency/                   # Package integrity tests
```

This enhanced system provides:
- ✅ Automatic version calculation from commits
- ✅ Transactional publishing with rollback
- ✅ Comprehensive validation and testing
- ✅ Flexible configuration options
- ✅ Robust error handling and recovery
