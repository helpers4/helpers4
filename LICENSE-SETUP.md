# License Configuration for helpers4

## Overview

This project uses the **AGPL-3.0-or-later** license. All TypeScript files in the project include a standardized license header.

## License Header Format

All TypeScript files use the following compact 4-line header format:

```typescript
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
```

## VS Code Configuration

The project is configured with the **psioniq File Header** extension to automatically insert license headers for new files.

### Devcontainer Setup

The extension is automatically installed when opening the project in a devcontainer:
- **Extension ID**: `psioniq.psi-header` (defined in `.devcontainer/devcontainer.json`)
- **Auto-install**: Extension installed automatically on devcontainer creation
- **Configuration**: All settings are centralized in `.vscode/settings.json`

### Configuration Details

- **Author**: baxyz
- **Email**: baxy@etik.com
- **License**: AGPL-3.0-or-later (using SPDX ID)
- **Copyright Holder**: baxyz
- **Force to Top**: `true` (always inserts headers at the beginning of files)

The VS Code settings are configured in `.vscode/settings.json` and will automatically:
- Insert the license header at the **top of the file** (regardless of cursor position)
- Use the correct format with proper **SPDX license identifier**
- Apply consistent copyright information
- Track changes with the configured author information

### Manual Commands

You can manually insert or update headers using the VS Code command palette:
- `Ctrl+Shift+P` → "psi-header: Insert Header"
- `Ctrl+Shift+P` → "psi-header: Update Header"

### Configuration Fixes Applied

**Issue 1 - License placeholder not replaced**: 
- **Problem**: `<<license>>` placeholder wasn't being substituted
- **Solution**: Changed to `<<spdxid>>` which correctly maps to SPDX license identifiers

**Issue 2 - Header not inserted at top of file**:
- **Problem**: Extension was inserting headers at cursor position
- **Solution**: Added `"forceToTop": true` to configuration to always insert at file beginning

### Architecture Decision

**Configuration centralization**: All extension settings are kept in `.vscode/settings.json` only, avoiding duplication between workspace and devcontainer settings. The devcontainer only handles extension installation, while VS Code workspace settings handle all configuration.

This approach provides:
- ✅ **Single source of truth** for extension configuration
- ✅ **Easier maintenance** when updating settings
- ✅ **Clear separation** between installation and configuration
- ✅ **Version control friendly** with settings in `.vscode/`

## Automation Scripts

### License Header Script

The project includes a script (`add-license-headers.ts`) that uses Bun's native APIs to automatically add license headers:

**Local usage:**
```bash
bun run add-license-headers.ts
```

**Custom path usage:**
```bash
PROJECT_ROOT=/path/to/project bun run add-license-headers.ts
```

**CI/CD usage (GitHub Actions):**
```yaml
- name: Add license headers
  run: |
    PROJECT_ROOT=${{ github.workspace }} bun run add-license-headers.ts
```

### Script Benefits

- ✅ **No external dependencies**: Uses native `Bun.Glob` instead of `glob` package
- ✅ **Portable**: Works locally, in devcontainer, GitHub Actions via `PROJECT_ROOT`
- ✅ **Intelligent**: Avoids duplicates, handles shebang files correctly
- ✅ **Informative**: Shows summary of processed files

✅ All TypeScript files have been updated with the standardized license header
✅ VS Code extension is installed and configured
✅ Build system works correctly with license headers
✅ All tests pass
✅ Coherency tests validate the bundle system

## Files Covered

The license headers have been added to:
- All helper functions in `helpers/*/`
- All build system files in `.ci/build/`
- All test files (`*.test.ts`, `*.spec.ts`)
- All index and utility files

## License Compliance

This project is fully compliant with AGPL-3.0-or-later licensing requirements:
- All source files include proper SPDX license identifiers
- Copyright notices are consistent across the codebase
- License terms are clearly documented in the main LICENSE.md file
