# Test Utilities

This directory contains utility scripts and configurations for testing.

## Files

### `preload.ts`

Test preload configuration for Bun test runner.

#### Purpose

This file is executed before test files to:
- Set up global test environment
- Configure test utilities
- Initialize test-specific settings
- Provide common test helpers

#### Configuration

Referenced in `bunfig.toml`:
```toml
[test]
preload = "scripts/tests/preload.ts"
```

#### Integration

- **Bun Test Runner** : Automatically loaded before test execution
- **Global Setup** : Provides consistent test environment
- **Helper Functions** : Common utilities available to all tests

## Usage

The preload script runs automatically when executing tests:

```bash
# Run tests (preload automatically executed)
bun test

# Run specific test files
bun test helpers/**/*.test.ts
```

## Benefits

- **Consistency** : Same setup across all tests
- **DRY Principle** : Avoid repeating setup code in individual tests
- **Performance** : One-time setup instead of per-test initialization
- **Global Access** : Test utilities available everywhere
