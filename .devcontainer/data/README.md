# DevContainer Persistent Data

This directory stores **local persistent data** for the devcontainer that should persist across container rebuilds.

## 📁 Directory Structure

```
.devcontainer/
├── devcontainer.json   # Main devcontainer configuration
├── setup-container.sh  # Container setup script (executed before bun install)
└── data/
    ├── README.md       # This file
    └── zsh_history     # Zsh command history (local persistence)
```

## 🎯 Purpose

This directory contains data that needs to be persisted locally for the project:

- **Shell History**: Your zsh command history is preserved between container rebuilds

## 🔗 Host Configuration Strategy

The devcontainer uses a **hybrid approach** for maximum compatibility:

### **Direct Mount (Reliable):**
- **Git Config**: `~/.gitconfig` → Mounted directly for Git user settings
- **GPG Keys**: `~/.gnupg` → Mounted directly for commit signing

### **SSH Agent Forwarding (Recommended):**
- **SSH Authentication**: Uses `SSH_AUTH_SOCK` environment variable forwarding
- **Benefits**: Secure authentication without copying private keys

### **GPG Configuration:**
- **GPG_TTY**: Set to `/dev/pts/0` for proper TTY handling
- **Auto-permissions**: GPG directory permissions set automatically

### **Container Setup Script:**
The `setup-container.sh` script handles:
- SSH/GPG directory permissions
- Environment validation and diagnostics
- Setup verification with helpful status messages

### **Manual Setup (When Needed):**
For specific SSH configurations that don't work with agent forwarding:

```bash
# SSH keys (if agent forwarding doesn't work)
cp ~/.ssh/id_* .devcontainer/data/ssh/ 2>/dev/null || true
```

### **Testing Your Setup:**
```bash
# Test SSH
ssh -T git@github.com

# Test GPG
gpg --list-secret-keys --keyid-format LONG

# Test Git signing (if configured)
git config --get user.signingkey
```

## ✅ Benefits of This Approach

- **🔧 Maximum Compatibility**: Works across all platforms and setups
- **🔐 Secure by Default**: SSH agent forwarding when possible
- **🎯 Fallback Options**: Manual setup available when needed
- **🚀 Zero Config**: Git config works immediately

## 🎉 Ready to Use

Your development environment is fully configured:
- **Git**: User config and commit signing ready
- **SSH**: Agent forwarding for GitHub/GitLab authentication  
- **GPG**: Keys available for commit signing
- **Shell**: History persisted across container rebuilds

## 📁 Directory Structure

```
.devcontainer/data/
├── README.md           # This file
└── zsh_history         # Zsh command history (local persistence)
```

## 🎯 Purpose

This directory contains **only** data that needs to be persisted locally for the project:

- **Shell History**: Your zsh command history is preserved between container rebuilds

## 🔗 Host Configuration via Features

The devcontainer uses modern **features** to securely access your host configurations:

### **Features Used:**
- **`ssh-agent`**: Forwards your SSH agent for secure Git authentication
- **`git-credential-manager`**: Manages Git credentials automatically  
- **`gpg-agent`**: Forwards your GPG agent for commit signing

## ✅ Benefits of Feature-Based Approach

- **🔐 Maximum Security**: Uses agent forwarding instead of copying sensitive keys
- **🎯 Zero Configuration**: Works automatically without manual setup
- **🚀 Modern Standard**: Follows Microsoft's recommended practices
- **� Cross-Platform**: Compatible with Windows, macOS, and Linux
- **📦 No Key Duplication**: No sensitive data stored in the project

## 🚫 What's Handled by Features

These are automatically managed via devcontainer features:
- ~~SSH keys~~ (via SSH agent forwarding)
- ~~GPG keys~~ (via GPG agent forwarding)
- ~~Git credentials~~ (via Git credential manager)

Only project-specific data (shell history) needs local persistence.

## 🎉 Zero Setup Required

Your Git, SSH, and GPG configurations work immediately through secure agent forwarding!
