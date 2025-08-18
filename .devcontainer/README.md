# Container Setup Script

This script (`setup-container.sh`) is executed automatically when the devcontainer is created, **before** `bun install`.

## 🎯 Purpose

The script handles the initial setup and configuration of the container environment:

- **🔒 Security**: Sets proper permissions for SSH and GPG directories
- **✅ Validation**: Checks that configurations are properly mounted
- **📋 Diagnostics**: Provides helpful status messages during setup
- **🔍 Testing**: Verifies SSH agent and GPG functionality

## 🔧 What it does

1. **SSH Setup**: Creates `~/.ssh` with `700` permissions
2. **GPG Setup**: Sets `700` for `~/.gnupg` directory and `600` for contents
3. **Environment Check**: Validates SSH_AUTH_SOCK and mounted configurations
4. **Status Report**: Shows what's working and what might need attention

## 📝 Execution Order

```
Container Start → setup-container.sh → bun install → Ready to use
```

## 🛠️ Customization

You can modify this script to add:
- Additional environment setup
- Custom tool installations
- Project-specific configurations
- Development shortcuts

The script is designed to be idempotent and safe to run multiple times.
