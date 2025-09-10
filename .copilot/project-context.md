# GitHub Copilot Context - Helpers4 Main Library

This directory contains context information and prompts to help GitHub Copilot understand the Helpers4 project structure and assist with development tasks.

## Project Overview

Helpers4 is a comprehensive TypeScript utility library designed for modern web development with the following key characteristics:

- **TypeScript-first**: Built with TypeScript for excellent type safety and developer experience
- **Tree-shaking optimized**: Each helper is independently importable for minimal bundle impact
- **Modular architecture**: Organized into focused packages by category
- **Production-ready**: Thoroughly tested with comprehensive test suites
- **Modern tooling**: Uses Bun as package manager and build tool
- **Automated workflows**: Complete CI/CD with version management, building, testing, and publishing

## Architecture

### Package Structure
The project follows a monorepo-like structure where each category becomes an independent npm package:

```
@helpers4/array     - Array manipulation utilities
@helpers4/function  - Function utilities (debounce, throttle, memoize)
@helpers4/object    - Object manipulation helpers
@helpers4/promise   - Promise and async utilities
@helpers4/string    - String processing functions
@helpers4/url       - URL manipulation helpers
@helpers4/observable - Observable utilities
@helpers4/date      - Date manipulation utilities
@helpers4/number    - Number utilities
@helpers4/math      - Mathematical utilities
@helpers4/type      - Type utilities and guards
@helpers4/version   - Version management utilities
@helpers4/all       - Complete bundle with all helpers
```

### Scripts Architecture
The project uses a well-organized scripts directory structure:

```
scripts/
├── build/          # Build system and package generation
├── coherency/      # Validation and integrity tests
├── constants/      # Shared constants across scripts
├── license/        # License management tools
├── publish/        # NPM publishing with transaction safety
├── tests/          # Test utilities and configuration
└── version/        # Version management and release automation
```

### Build System
- **Entry point**: Each category has its own `index.ts` that exports all functions
- **Configuration**: `config.json` in each category defines package metadata
- **Build process**: `scripts/build/` contains the build system that generates individual packages
- **Publishing**: `scripts/publish/` handles npm publishing with transaction safety
- **Documentation**: Each script directory has comprehensive README.md files

### Code Organization

#### Source Code Structure
```
helpers/
├── array/           # Array helper functions
├── date/            # Date manipulation utilities
├── function/        # Function utilities (debounce, throttle, memoize)
├── math/            # Mathematical utilities
├── number/          # Number utilities
├── object/          # Object manipulation helpers
├── observable/      # Observable utilities
├── promise/         # Promise and async utilities
├── string/          # String processing functions
├── type/            # Type utilities and guards
├── url/             # URL manipulation helpers
└── version/         # Version management utilities

Each category contains:
├── *.ts             # Helper function implementations
├── *.test.ts        # Comprehensive test files
├── index.ts         # Category exports
└── config.json      # Package configuration and metadata
```

#### Scripts Organization
```
scripts/
├── README.md                    # Main scripts documentation
├── build/
│   ├── README.md               # Build system documentation
│   ├── index.ts                # Main build orchestrator
│   ├── build-categories.ts     # Category package builder
│   ├── build-bundle.ts         # Bundle package builder
│   └── helpers/                # Build utilities and helpers
├── coherency/
│   ├── README.md               # Coherency testing documentation
│   ├── index.ts                # Main test runner
│   ├── test-bundle.ts          # Bundle integrity tests
│   ├── test-category-packages.ts # Category validation
│   ├── test-dependencies-coherency.ts # Dependency validation
│   └── test-version-consistency.ts # Version consistency checks
├── constants/
│   ├── README.md               # Constants documentation
│   ├── index.ts                # Central constants export
│   ├── build.constant.ts       # Build-related constants
│   ├── dir.constant.ts         # Directory path constants
│   └── files.constant.ts       # File name constants
├── license/
│   ├── README.md               # License management documentation
│   └── add-license-headers.ts  # License header automation
├── publish/
│   ├── README.md               # Publishing documentation
│   ├── index.ts                # Main publishing script
│   └── helpers/                # Publishing utilities
├── tests/
│   ├── README.md               # Test utilities documentation
│   └── preload.ts              # Test preload configuration
└── version/
    ├── README.md               # Version management documentation
    ├── index.ts                # Version management entry point
    ├── version-manager.ts      # Version bump automation
    ├── release.ts              # Complete release process
    ├── commit-analyzer.ts      # Conventional commit analysis
    ├── git-utils.ts            # Git operation utilities
    └── pre-release-validator.ts # Pre-release validation
```

#### Build Output Structure
```
build/
├── array/          # Category package output
│   ├── lib/        # Compiled JavaScript/TypeScript
│   ├── package.json
│   ├── README.md
│   └── LICENSE.md
├── [other-categories]/
└── all/            # Bundle package
    ├── meta/       # Bundle metadata
    ├── package.json
    ├── README.md
    └── LICENSE.md
```

## Related Projects

### Documentation Website (helpers4/doc)
- **Repository**: https://github.com/helpers4/doc
- **Purpose**: Comprehensive documentation website built with Docusaurus
- **Features**: Interactive playground, API reference, examples, version management
- **Integration**: Automatically updates when new versions are released
- **Deployment**: GitHub Pages with custom domain support

### Build and CI System
- **Version Management**: `scripts/version/` contains version bumping and release logic
- **Build System**: `scripts/build/` generates TypeScript definitions and package files
- **Publishing**: `scripts/publish/` handles npm publishing with retry logic
- **Testing**: Comprehensive test suite with coherency checks

## Key Concepts

### Tree-shaking Optimization
Each helper function is designed to be independently importable:
```typescript
// Individual imports (recommended)
import { chunk } from '@helpers4/array';
import { debounce } from '@helpers4/function';

// Category imports
import { chunk, unique, sort } from '@helpers4/array';

// Complete bundle (convenience)
import { chunk, debounce, deepMerge } from '@helpers4/all';
```

### Type Safety
All functions include comprehensive TypeScript types:
- Generic type parameters where appropriate
- Strict input/output typing
- IntelliSense support
- Type guards and utilities

### Testing Strategy
- **Unit tests**: Each function has comprehensive tests
- **Integration tests**: Cross-function compatibility
- **Performance tests**: Benchmarking critical functions
- **Coherency tests**: Validate build output matches source

## Development Workflow

### Adding New Helpers
1. **Create function** in appropriate category directory (`helpers/[category]/`)
2. **Add comprehensive tests** with `.test.ts` extension
3. **Update category index.ts** to export the new function
4. **Update config.json** if needed (description, keywords, exports)
5. **Run build and validation**:
   ```bash
   npm run build
   npm run coherency
   ```
6. **Update documentation** and add JSDoc comments

### Release Process
1. **Version management**:
   ```bash
   # Automatic version detection from commits
   npm run version:auto
   
   # Manual version types
   npm run version:patch     # Bug fixes
   npm run version:minor     # New features
   npm run version:major     # Breaking changes
   npm run version:prerelease # Alpha/beta versions
   ```

2. **Complete release**:
   ```bash
   # Full automated release process
   npm run release:patch
   npm run release:minor
   npm run release:major
   
   # Auto-detect and release
   npm run release:auto
   
   # Dry run for testing
   npm run release:dry-run
   ```

3. **Manual publishing** (if needed):
   ```bash
   npm run build
   npm run coherency
   npm run publish
   
   # Or dry run first
   npm run publish:dry-run
   ```

### Testing and Validation
```bash
# Run all tests
npm test
bun test

# Test specific category
bun test helpers/array/

# Run coherency tests
npm run coherency

# Validate before release
bun scripts/version/pre-release-validator.ts
```

### Scripts and Automation
```bash
# Build system
npm run build                    # Build all packages
bun scripts/build/               # Direct build script access

# Version management
npm run version:auto             # Auto-detect version from commits
npm run version:auto-dry         # Preview version changes
bun scripts/version/version-manager.ts --help

# Publishing
npm run publish                  # Publish all packages
npm run publish:dry-run          # Test publishing
bun scripts/publish/ --help      # See all publishing options

# Coherency and validation
npm run coherency                # Run all coherency tests
bun scripts/coherency/test-bundle.ts      # Test bundle only
bun scripts/coherency/test-version-consistency.ts

# License management
bun scripts/license/add-license-headers.ts
```

## Configuration Files

### Package Configuration (`helpers/*/config.json`)
```json
{
  "name": "@helpers4/array",
  "description": "Array manipulation utilities",
  "keywords": ["array", "chunk", "unique", "utilities"],
  "exports": ["chunk", "unique", "arrayEquals", "difference", "intersection", "oneInCommon", "sort"]
}
```

### Build Configuration
- `tsconfig.json`: TypeScript compilation settings
- `bunfig.toml`: Bun package manager configuration
- `scripts/build/`: Build system implementation
- `scripts/publish/`: Publishing configuration

## External Dependencies

### Runtime Dependencies
- `angular-oauth2-oidc`: OAuth2/OIDC integration
- `radashi`: Additional utility functions
- `rxjs`: Observable utilities

### Development Dependencies
- `@types/*`: TypeScript definitions
- `vitest`: Testing framework
- Custom build tooling

## Integration Points

### Documentation Website
- **Trigger**: GitHub Actions workflow dispatch on release
- **Data Flow**: Version info → Documentation version creation
- **Content**: API reference auto-generated from TSDoc comments

### NPM Publishing
- **Packages**: Multiple packages published simultaneously
- **Registry**: https://registry.npmjs.org/
- **Scope**: @helpers4 organization
- **Access**: Public packages

### GitHub Integration
- **Releases**: Automated GitHub releases with changelogs
- **Actions**: CI/CD workflows for testing and publishing
- **Branches**: Main branch protection with required checks

## Best Practices

### Code Style and Conventions
- **TypeScript strict mode**: All code uses strict TypeScript configuration
- **Pure functions**: Prefer pure functions without side effects when possible
- **Comprehensive JSDoc**: All public functions have detailed JSDoc comments
- **Consistent naming**: Use camelCase for functions, PascalCase for types
- **Error handling**: Handle edge cases explicitly with clear error messages
- **Type safety**: Leverage TypeScript's type system fully

### Testing Standards
- **Comprehensive coverage**: Each function has multiple test cases
- **Edge case testing**: Test boundary conditions and error scenarios
- **Performance testing**: Benchmark performance-critical functions
- **Integration testing**: Validate cross-function compatibility
- **Coherency validation**: Ensure build output matches source expectations

### Documentation Requirements
- **JSDoc comments**: All public APIs documented with examples
- **README files**: Each directory has comprehensive documentation
- **Usage examples**: Real-world usage examples in documentation
- **Type documentation**: Clear explanation of generic types and constraints
- **Migration guides**: Document breaking changes and upgrade paths

### Performance Guidelines
- **Tree-shaking optimization**: Design for efficient tree-shaking
- **Minimal dependencies**: Keep runtime dependencies to absolute minimum
- **Algorithm efficiency**: Use optimal algorithms for common operations
- **Memory management**: Consider memory usage patterns
- **Bundle size**: Monitor and optimize final bundle sizes

### Release and Versioning
- **Conventional commits**: Use conventional commit messages for auto-versioning
- **Semantic versioning**: Follow SemVer strictly for all releases
- **Breaking changes**: Document breaking changes thoroughly
- **Backward compatibility**: Maintain compatibility when possible
- **Deprecation process**: Gradual deprecation with clear migration paths

### Security Practices
- **Dependency updates**: Regular security updates for all dependencies
- **Vulnerability scanning**: Automated security scanning in CI/CD
- **Input validation**: Validate all inputs and handle malicious data
- **Safe defaults**: Use secure defaults for all configurations
- **License compliance**: Ensure all code has proper license headers

## Tools and Integrations

### Development Tools
- **Bun**: Primary package manager and test runner for fast development
- **TypeScript**: Strict TypeScript for type safety and developer experience
- **Vitest**: Testing framework integrated with Bun for fast test execution
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting (configured via .editorconfig)

### Build and Automation
- **Custom Build System**: TypeScript-based build scripts in `scripts/build/`
- **Version Management**: Automated versioning with conventional commits
- **License Headers**: Automated license header management
- **Coherency Testing**: Custom validation scripts for package integrity
- **Transaction Publishing**: Safe NPM publishing with rollback capabilities

### CI/CD Integration
- **GitHub Actions**: Automated testing, building, and publishing workflows
  - `release.yml`: Manual release workflow with version management
  - `pr-validation.yml`: Comprehensive PR validation including security scanning
- **Multi-node testing**: Matrix strategy testing on Node.js 18, 20, and 22
- **Security scanning**: Automated dependency auditing and sensitive data detection
- **Conventional commits**: Automatic validation of commit message format
- **Release Automation**: Triggered via GitHub Actions with manual dispatch
- **NPM Registry**: Automated publishing to `@helpers4` scoped packages
- **Documentation Updates**: Automatic documentation website updates on release
- **PR Status Updates**: Automated commenting on PRs with validation results

### File Structure Conventions
```
# Configuration Files
├── package.json          # Root package configuration
├── tsconfig.json         # TypeScript configuration
├── bunfig.toml          # Bun configuration with test preload
├── .editorconfig        # Editor configuration
├── .eslintrc.json       # ESLint configuration
└── .gitignore           # Git ignore patterns

# Source Organization
├── helpers/             # Source code organized by category
├── scripts/             # Build, test, and automation scripts
├── build/               # Generated package output (git-ignored)
└── .template/           # Template files for package generation

# Documentation
├── README.md            # Main project documentation
├── LICENSE.md           # Project license
└── scripts/*/README.md  # Script-specific documentation
```

### Package Naming and Scope
- **Scope**: All packages published under `@helpers4/` scope
- **Category packages**: Named by category (e.g., `@helpers4/array`)
- **Bundle package**: Complete bundle as `@helpers4/all`
- **Version consistency**: All packages maintain the same version number

### Testing Configuration
- **Test files**: Co-located with source using `.test.ts` extension
- **Test preload**: `scripts/tests/preload.ts` for common test setup
- **Coverage**: Comprehensive test coverage requirements
- **Performance tests**: Benchmarking for critical functions

This context helps GitHub Copilot understand the project structure, conventions, and provide relevant suggestions for development tasks specific to the Helpers4 library.
