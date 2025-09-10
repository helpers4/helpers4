# Development Practices and Guidelines

This document outlines the development practices, coding standards, and workflow guidelines for the Helpers4 project.

## Code Quality Standards

### TypeScript Guidelines
- **Strict mode**: Always use strict TypeScript configuration
- **Type safety**: Prefer explicit types over `any`
- **Interface over type**: Use interfaces for object shapes, types for unions/intersections
- **Generics**: Use generics for reusable components with type safety
- **Utility types**: Leverage TypeScript utility types (Partial, Required, Pick, etc.)

### Naming Conventions
- **Functions**: Use camelCase with descriptive names (e.g., `deepClone`, `arrayEquals`)
- **Constants**: Use UPPER_SNAKE_CASE for module-level constants
- **Interfaces**: Use PascalCase with descriptive names (e.g., `DeepCloneOptions`)
- **Files**: Use kebab-case for filenames (e.g., `deep-clone.ts`)
- **Packages**: Use kebab-case with scope (e.g., `@helpers4/array`)

### Function Design Principles
- **Single responsibility**: Each function should have one clear purpose
- **Pure functions**: Prefer pure functions without side effects
- **Immutability**: Never mutate input parameters, return new objects/arrays
- **Error handling**: Use proper error handling with meaningful error messages
- **Performance**: Consider time and space complexity for all implementations

## Testing Requirements

### Test Coverage
- **Unit tests**: Every public function must have comprehensive unit tests
- **Edge cases**: Test boundary conditions, null/undefined inputs, empty arrays/objects
- **Error scenarios**: Test error conditions and exception handling
- **Performance tests**: Include performance benchmarks for critical functions

### Test Structure
```typescript
describe('functionName', () => {
  describe('when valid input is provided', () => {
    it('should return expected result', () => {
      // Test implementation
    });
  });

  describe('when invalid input is provided', () => {
    it('should handle null/undefined gracefully', () => {
      // Test implementation
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays/objects', () => {
      // Test implementation
    });
  });
});
```

### Test Utilities
- **Setup**: Use `scripts/tests/preload.ts` for common test configuration
- **Mocking**: Use Bun's built-in mocking capabilities
- **Async testing**: Proper async/await patterns for Promise testing
- **Performance**: Use `console.time()` for performance benchmarking

## Git Workflow

### Branch Strategy
- **main**: Production-ready code, protected branch
- **develop**: Integration branch for features (if used)
- **feature/**: Feature branches (e.g., `feature/array-unique-by`)
- **fix/**: Bug fix branches (e.g., `fix/deep-clone-circular-reference`)
- **chore/**: Maintenance branches (e.g., `chore/update-dependencies`)

### Commit Message Format
Follow conventional commit format strictly:

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without functional changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `perf`: Performance improvements
- `ci`: CI/CD configuration changes
- `build`: Build system changes
- `revert`: Reverting previous commits

**Examples:**
```
feat(array): add arrayEquals function with deep comparison
fix(object): handle circular references in deepClone
docs(readme): update installation instructions
test(string): add edge cases for capitalize function
```

### Pull Request Guidelines

#### Before Creating a PR
1. Ensure all tests pass locally: `bun run test`
2. Run coherency checks: `bun run coherency`
3. Build packages successfully: `bun run build`
4. Verify TypeScript compilation: `bun run tsc --noEmit`
5. Check for linting issues: `bun run lint` (if available)

#### PR Description Template
```markdown
## Description
Brief description of the changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- List specific changes made
- Include any new functions or modifications
- Mention any breaking changes

## Testing
- [ ] Unit tests added/updated
- [ ] All existing tests pass
- [ ] Edge cases covered
- [ ] Performance impact assessed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No sensitive data exposed
```

#### Automated PR Validation
The CI/CD pipeline automatically validates:

1. **Code Quality**
   - TypeScript compilation
   - Linting (if configured)
   - Test suite execution
   - Build process validation

2. **Security Scanning**
   - Dependency vulnerability audit
   - Sensitive data pattern detection
   - External contributor safety checks

3. **Convention Compliance**
   - Conventional commit message format
   - Bundle size analysis
   - Package coherency validation

4. **Multi-Environment Testing**
   - Node.js 18, 20, and 22 compatibility
   - Cross-platform validation (Ubuntu)
   - Dependency caching optimization

## Release Process

### Version Management
- **Semantic Versioning**: Follow SemVer (MAJOR.MINOR.PATCH)
- **Conventional Commits**: Automatic version bumping based on commit types
- **Pre-release**: Use `-alpha`, `-beta`, `-rc` suffixes for pre-releases
- **Changelog**: Automatically generated from conventional commits

### Release Scripts
- `bun run version:patch`: Increment patch version
- `bun run version:minor`: Increment minor version  
- `bun run version:major`: Increment major version
- `bun run version:auto`: Automatic version based on commits
- `bun run release:auto`: Complete release process with auto-versioning

### Publication
- **Scope**: All packages published under `@helpers4/` namespace
- **Registry**: Published to NPM registry
- **Transaction Safety**: Rollback capability for failed publications
- **License**: Automatic AGPL-3.0 license header management

## Documentation Standards

### Code Documentation
- **JSDoc**: Use JSDoc comments for all public functions
- **Examples**: Include usage examples in documentation
- **Parameters**: Document all parameters with types and descriptions
- **Return values**: Document return types and possible values
- **Exceptions**: Document when functions throw errors

### README Structure
Each helper category should have:
1. Brief description and purpose
2. Installation instructions
3. Usage examples with code snippets
4. API reference with all functions
5. Performance considerations
6. Browser/Node.js compatibility notes

### Example JSDoc Format
```typescript
/**
 * Performs deep comparison between two values
 * @param value1 - First value to compare
 * @param value2 - Second value to compare
 * @param options - Comparison options
 * @returns True if values are deeply equal, false otherwise
 * @throws {TypeError} When comparison options are invalid
 * 
 * @example
 * ```typescript
 * const result = deepCompare({ a: 1 }, { a: 1 });
 * console.log(result); // true
 * ```
 */
```

## Performance Guidelines

### Optimization Strategies
- **Algorithm Selection**: Choose optimal algorithms for expected data sizes
- **Memory Efficiency**: Minimize memory allocations and garbage collection
- **Tree Shaking**: Design for efficient dead code elimination
- **Bundle Size**: Monitor and optimize package sizes
- **Lazy Loading**: Support lazy loading where applicable

### Benchmarking
- **Performance Tests**: Include performance benchmarks for critical functions
- **Regression Testing**: Monitor performance across releases
- **Memory Profiling**: Use memory profiling for complex operations
- **Bundle Analysis**: Regular bundle size analysis and optimization

This document serves as a comprehensive guide for maintaining code quality, consistency, and best practices across the Helpers4 project.
