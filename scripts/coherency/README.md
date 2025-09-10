# Coherency Tests

This directory contains scripts for validating the coherency and integrity of the project structure, packages, and dependencies.

## Overview

Coherency tests ensure that:

- Build outputs are correct and complete
- Package versions are consistent across all packages
- Dependencies are properly configured
- Package structures follow expected patterns

## Scripts

### `index.ts`

Main coherency test runner that executes all validation tests.

#### Usage

```bash
# Run all coherency tests
bun scripts/coherency/

# Also available via npm script
npm run coherency
```

### `test-bundle.ts`

Tests the main bundle package integrity.

#### Validations

- ✅ All required files exist
- ✅ Package.json is valid
- ✅ Dependencies are correct
- ✅ Metadata is consistent

#### Usage

```bash
bun scripts/coherency/test-bundle.ts
```

### `test-category-packages.ts`

Validates all category packages (array, string, object, etc.).

#### Checks

- Package structure consistency
- Export file validity
- Dependency coherency
- Configuration compliance

### `test-dependencies-coherency.ts`

Verifies dependencies consistency across all packages.

#### Validations

- External dependencies versions match
- Internal dependencies are properly configured
- No circular dependencies
- Version consistency across packages

### `test-version-consistency.ts`

Ensures all packages have consistent version numbers.

#### Checks

- Root package version matches build packages
- All category packages use same version
- Bundle package version is consistent
- No version mismatches

## Integration

Coherency tests are integrated with:

- **Build process** : Validates build output
- **Release process** : Pre-release validation
- **CI/CD** : Automated testing in workflows
- **Publishing** : Pre-publish validation

## Usage in CI/CD

```yaml
# In GitHub Actions
- name: Run Coherency Tests
  run: bun scripts/coherency/
```

## Test Output

Tests provide detailed feedback including:

- ✅ Passed validations
- ❌ Failed validations with specific error messages
- 📊 Summary of all test results
- 🔍 Detailed information about discovered issues

## Related Documentation

- **[../README.md](../README.md)** - Main scripts documentation
- **[../build/README.md](../build/README.md)** - Build system that generates validated output
- **[../version/README.md](../version/README.md)** - Version management using coherency tests
- **[../publish/README.md](../publish/README.md)** - Publishing system with pre-publish validation
