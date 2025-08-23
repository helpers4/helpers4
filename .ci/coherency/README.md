# Coherency Tests

This directory contains all validation tests that ensure the integrity and coherency of the helpers4 build system.

## Purpose

The coherency tests validate that:
- Build outputs are correct and complete
- Package versions are consistent
- Dependencies are properly resolved
- Metadata is accurate and up-to-date

## Current Tests

### `test-bundle.ts`
Validates the bundle package (`@helpers4/all`) integrity:
- ✅ All required files exist
- ✅ Package.json is correctly formatted
- ✅ Dependencies are properly listed
- ✅ Metadata files contain accurate information
- ✅ Version consistency across packages

## Usage

```bash
# Run individual tests
bun run .ci/coherency/test-bundle.ts

# Run all coherency tests
bun run .ci/coherency/index.ts
```

## Adding New Tests

To add new coherency tests:

1. Create a new test file (e.g., `test-categories.ts`)
2. Export a test function that returns `Promise<void>`
3. Add the test to `index.ts` runner
4. Update this README

## Future Test Ideas

- **Category Package Coherency**: Validate individual category packages
- **Version Consistency**: Ensure all packages use the same version
- **Dependency Resolution**: Check that external dependencies are properly handled
- **Template Validation**: Verify that templates generate correct outputs
- **Build Reproducibility**: Ensure builds are deterministic
