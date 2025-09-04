# GitHub Copilot Context - Helpers4 Main Library

This directory contains context information and prompts to help GitHub Copilot understand the Helpers4 project structure and assist with development tasks.

## Project Overview

Helpers4 is a comprehensive TypeScript utility library designed for modern web development with the following key characteristics:

- **TypeScript-first**: Built with TypeScript for excellent type safety and developer experience
- **Tree-shaking optimized**: Each helper is independently importable for minimal bundle impact
- **Modular architecture**: Organized into focused packages by category
- **Production-ready**: Thoroughly tested with comprehensive test suites
- **Modern tooling**: Uses Bun as package manager and build tool

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
@helpers4/all       - Complete bundle with all helpers
```

### Build System
- **Entry point**: Each category has its own `index.ts` that exports all functions
- **Configuration**: `config.json` in each category defines package metadata
- **Build process**: `.ci/build/` contains the build system that generates individual packages
- **Publishing**: `.ci/publish/` handles npm publishing with transaction safety

### Code Organization
```
helpers/
├── array/           # Array helper functions
├── function/        # Function utilities
├── object/          # Object manipulation
├── promise/         # Promise utilities
├── string/          # String processing
├── url/             # URL utilities
├── observable/      # Observable helpers
├── date/            # Date utilities
└── number/          # Number utilities

Each category contains:
├── *.ts             # Helper function implementations
├── *.test.ts        # Test files
├── index.ts         # Category exports
└── config.json      # Package configuration
```

## Related Projects

### Documentation Website (helpers4/doc)
- **Repository**: https://github.com/helpers4/doc
- **Purpose**: Comprehensive documentation website built with Docusaurus
- **Features**: Interactive playground, API reference, examples, version management
- **Integration**: Automatically updates when new versions are released
- **Deployment**: GitHub Pages with custom domain support

### Build and CI System
- **Version Management**: `.ci/version/` contains version bumping and release logic
- **Build System**: `.ci/build/` generates TypeScript definitions and package files
- **Publishing**: `.ci/publish/` handles npm publishing with retry logic
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
1. Create function in appropriate category directory
2. Add comprehensive tests
3. Update category `index.ts`
4. Update `config.json` if needed
5. Run build and test scripts
6. Update documentation

### Release Process
1. Use version management scripts: `bun .ci/version/version-manager.ts [patch|minor|major]`
2. Build packages: `bun run build`
3. Run tests: `bun run test`
4. Publish: `bun .ci/publish/`
5. Documentation automatically updates via GitHub Actions

### Testing
```bash
bun test                    # Run all tests
bun test helpers/array/     # Test specific category
bun run coherency          # Validate build output
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
- `.ci/build/`: Build system implementation
- `.ci/publish/`: Publishing configuration

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

### Code Style
- Use TypeScript strict mode
- Comprehensive JSDoc comments
- Consistent naming conventions
- Prefer pure functions where possible
- Handle edge cases explicitly

### Performance
- Optimize for tree-shaking
- Minimize runtime dependencies
- Use efficient algorithms
- Consider memory usage
- Benchmark performance-critical functions

### Maintenance
- Keep dependencies updated
- Monitor security vulnerabilities
- Regular performance audits
- Community feedback integration
- Documentation maintenance

This context helps GitHub Copilot understand the project structure and provide relevant suggestions for development tasks.
