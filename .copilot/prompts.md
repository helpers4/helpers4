feat: implement version management and release process

- Added commit-analyzer.ts for analyzing git commits and suggesting version types based on conventional commits.
- Introduced git-utils.ts for handling git operations such as creating commits, tags, and checking the current branch.
- Created index.ts to export all version-related modules for easier access.
- Developed pre-release-validator.ts to validate the environment, repository state, dependencies, scripts, and build system before a release.
- Implemented release.ts to orchestrate the release process, including version updates, building packages, and publishing.
- Added version-manager.ts for managing version updates across packages, including parsing and incrementing version numbers.# Copilot Prompts - Helpers4 Main Library

This file contains specific prompts to help GitHub Copilot understand tasks and provide better assistance for the Helpers4 project.

## Quick Start Prompts

### Understanding the Project
```
Help me understand the Helpers4 project structure. This is a TypeScript utility library with:
- Modular packages for different helper categories (array, function, object, etc.)
- Tree-shaking optimization for minimal bundle impact
- Comprehensive testing and type safety
- Automated build system that generates individual npm packages
- GitHub Actions workflows for CI/CD automation
- Conventional commit format for automated versioning
- Security scanning and PR validation

Show me how the pieces fit together and the development workflow.
```

### Adding a New Helper Function
```
I want to add a new helper function to the [CATEGORY] category. Help me:
1. Create the function with proper TypeScript types
2. Add comprehensive tests with edge cases
3. Update the category index.ts exports
4. Ensure tree-shaking compatibility
5. Add proper JSDoc documentation
6. Follow the existing code patterns
7. Consider performance implications and bundle size

The function should be: [DESCRIBE FUNCTION]
```

### Build System Tasks
```
Help me work with the build system in scripts/build/. I need to:
- Understand how packages are generated from the monorepo structure
- Modify the TypeScript compilation process
- Ensure proper .d.ts file generation
- Validate tree-shaking compatibility
- Add new build steps or optimizations
- Integrate with GitHub Actions workflow

Current task: [DESCRIBE SPECIFIC BUILD TASK]
```

### Testing and Quality Assurance
```
Help me improve testing for Helpers4. I need to:
- Add comprehensive test cases for [SPECIFIC FUNCTION/CATEGORY]
- Test edge cases and error conditions
- Validate TypeScript type safety
- Add performance benchmarks
- Ensure compatibility across Node.js versions (18, 20, 22)
- Follow conventional commit format for test changes
- Ensure browser and Node.js compatibility

Focus on: [SPECIFIC AREA]
```

## Category-Specific Prompts

### Array Helpers
```
I'm working on array helper functions. These should:
- Handle large datasets efficiently
- Support generic types properly
- Work with both arrays and array-like objects
- Include proper error handling
- Be optimized for common use cases like chunking, filtering, and transformation

Current task: [SPECIFIC ARRAY FUNCTION]
```

### Function Helpers
```
I'm developing function utilities like debounce, throttle, and memoize. Focus on:
- Proper cleanup and memory management
- Type-safe function signatures
- Edge case handling (rapid calls, cleanup, etc.)
- Performance optimization
- Clear API design

Current task: [SPECIFIC FUNCTION UTILITY]
```

### Object Helpers
```
I'm working on object manipulation helpers. These need to:
- Handle deep operations safely
- Preserve type information
- Support complex nested structures
- Handle circular references appropriately
- Maintain performance for large objects

Current task: [SPECIFIC OBJECT FUNCTION]
```

### Promise Helpers
```
I'm developing promise and async utilities. Consider:
- Error handling and retry logic
- Timeout management
- Cancellation support
- Type safety with async operations
- Integration with modern async/await patterns

Current task: [SPECIFIC PROMISE UTILITY]
```

## Integration Prompts

### Documentation Integration
```
Help me maintain integration with the helpers4/doc documentation project:
- Generate API documentation from TypeScript source
- Sync examples between code and docs
- Update documentation when APIs change
- Coordinate version releases
- Ensure examples in playground work correctly

Current task: [SPECIFIC DOCUMENTATION TASK]
```

### CI/CD and Automation
```
Help me work with the CI/CD pipeline:
- GitHub Actions workflows for testing and publishing
- Automated version management
- NPM publishing with proper scoping
- Integration with documentation updates
- Security and quality checks

Current task: [SPECIFIC CI/CD TASK]
```

### Release Management
```
Help me manage releases for Helpers4:
- Version bumping strategies (patch/minor/major)
- Changelog generation
- NPM package publishing
- GitHub release creation
- Documentation website updates
- Breaking change communication

Current task: [SPECIFIC RELEASE TASK]
```

## Development Workflow Prompts

### Starting New Development
```
I'm starting work on [FEATURE/AREA]. Help me:
1. Understand the current state of this area
2. Identify the best approach for implementation
3. Consider integration with existing helpers
4. Plan testing strategy
5. Anticipate potential issues

Context: [SPECIFIC CONTEXT]
```

### Code Review and Optimization
```
Review this code for the Helpers4 library and suggest improvements:
- Type safety and generics usage
- Performance optimizations
- Tree-shaking compatibility
- Error handling
- Code clarity and maintainability
- Test coverage gaps

[PASTE CODE HERE]
```

### Debugging and Troubleshooting
```
I'm having an issue with [SPECIFIC PROBLEM]. Help me debug:
- Analyze the current behavior
- Identify potential causes
- Suggest debugging approaches
- Propose solutions
- Consider impact on other components

Current issue: [DESCRIBE PROBLEM]
```

### Performance Analysis
```
Help me analyze and optimize performance for:
- Bundle size impact
- Runtime performance
- Memory usage
- Tree-shaking effectiveness
- Benchmark against alternatives

Focus area: [SPECIFIC AREA OR FUNCTION]
```

## Architecture and Design Prompts

### Design Decisions
```
```

## CI/CD and GitHub Actions Prompts

### GitHub Actions Development
```
Help me work with GitHub Actions in the .github/workflows/ directory. I need to:
- Create a new workflow for [SPECIFIC PURPOSE]
- Modify the existing pr-validation.yml or release.yml workflow
- Add security scanning and vulnerability checks
- Implement matrix testing across Node.js versions
- Optimize workflow performance with caching strategies
- Handle external contributor PRs securely

Specific task: [DESCRIBE GITHUB ACTION TASK]
```

### Release Automation
```
Help me improve the release automation process. I need to:
- Enhance the conventional commit analysis
- Add automated changelog generation
- Implement safe rollback mechanisms for failed releases
- Optimize the NPM publishing process
- Add post-release validation steps
- Integrate with external services (documentation, notifications)

Current focus: [SPECIFIC RELEASE TASK]
```

### PR Validation Enhancement
```
Help me enhance the PR validation workflow. I need to:
- Add new quality gates or checks
- Improve security scanning capabilities
- Optimize test execution time
- Add bundle size monitoring
- Implement performance regression detection
- Enhance PR status reporting

Enhancement needed: [SPECIFIC VALIDATION IMPROVEMENT]
```

### Monitoring and Observability
```
Help me add monitoring to the CI/CD pipeline. I need to:
- Track workflow execution metrics
- Monitor build performance trends
- Set up alerting for failures
- Analyze security scan results
- Monitor package publication success rates
- Track dependency health

Monitoring goal: [SPECIFIC MONITORING OBJECTIVE]
```

## Architecture and Design Prompts

### Design Decisions
```
Help me make architectural decisions for Helpers4:
- API design patterns
- Type system design
- Module organization
- Dependency management
- Backwards compatibility
- Future extensibility
- CI/CD pipeline design

Decision needed: [SPECIFIC DECISION]
```

### Code Patterns
```
Help me establish consistent code patterns across Helpers4:
- Function naming conventions
- Type definition patterns
- Error handling strategies
- Documentation standards
- Testing approaches
- Commit message conventions

Area: [SPECIFIC PATTERN AREA]
```

### Integration Planning
```
Plan integration between Helpers4 and [EXTERNAL SYSTEM/LIBRARY]:
- API compatibility
- Type system integration
- Performance considerations
- Migration strategies
- Documentation needs
- CI/CD integration requirements

Integration target: [SPECIFIC TARGET]
```

## Usage Context

When using these prompts, always include:

1. **Current file/directory** you're working in
2. **Specific goal** you're trying to achieve
3. **Any constraints** or requirements
4. **Related files** that might be affected
5. **Expected outcome** or deliverable
6. **Security considerations** for CI/CD changes
7. **Performance impact** expectations

## Example Usage

```
I'm working in helpers/array/chunk.ts and want to optimize the chunk function for better performance with large arrays. Help me:

1. Analyze the current implementation
2. Identify performance bottlenecks
3. Suggest optimizations that maintain type safety
4. Update tests to validate performance improvements
5. Ensure backwards compatibility
6. Update the GitHub Actions workflow to include performance benchmarks
```

```
I'm modifying .github/workflows/pr-validation.yml to add automated security scanning. Help me:

1. Add security audit steps using bun audit
2. Implement sensitive data pattern detection
3. Add conditional execution for external PRs
4. Ensure minimal required permissions
5. Add results reporting to PR comments
6. Maintain workflow performance and reliability
```
```

### Code Patterns
```
Help me establish consistent code patterns across Helpers4:
- Function naming conventions
- Type definition patterns
- Error handling strategies
- Documentation standards
- Testing approaches

Area: [SPECIFIC PATTERN AREA]
```

### Integration Planning
```
Plan integration between Helpers4 and [EXTERNAL SYSTEM/LIBRARY]:
- API compatibility
- Type system integration
- Performance considerations
- Migration strategies
- Documentation needs

Integration target: [SPECIFIC TARGET]
```

## Usage Context

When using these prompts, always include:

1. **Current file/directory** you're working in
2. **Specific goal** you're trying to achieve
3. **Any constraints** or requirements
4. **Related files** that might be affected
5. **Expected outcome** or deliverable

## Example Usage

```
I'm working in helpers/array/chunk.ts and want to optimize the chunk function for better performance with large arrays. Help me:

1. Analyze the current implementation
2. Identify performance bottlenecks
3. Suggest optimizations that maintain type safety
4. Update tests to validate performance improvements
5. Ensure backwards compatibility

Current implementation handles arrays up to 10k elements well, but performance degrades with larger datasets.
```

This provides GitHub Copilot with the context needed to give specific, actionable assistance for Helpers4 development tasks.
