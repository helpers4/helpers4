#!/bin/bash
set -e

echo "🔧 Setting up devcontainer environment..."

# Create SSH directory with proper permissions
echo "📁 Setting up SSH directory..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Ensure zsh history file has correct permissions
if [ -f ~/.zsh_history ]; then
    echo "📝 Setting zsh history permissions..."
    chmod 600 ~/.zsh_history
fi

# Set up GPG directory permissions (if mounted)
if [ -d ~/.gnupg ]; then
    echo "🔐 Setting up GPG permissions..."
    chmod 700 ~/.gnupg 2>/dev/null || true
    find ~/.gnupg -type f -exec chmod 600 {} \; 2>/dev/null || true
fi

# Configure Git if needed
if [ -f ~/.gitconfig ]; then
    echo "✅ Git configuration found"
    git config --global --get user.name >/dev/null 2>&1 && echo "   - User: $(git config --global --get user.name)" || true
    git config --global --get user.email >/dev/null 2>&1 && echo "   - Email: $(git config --global --get user.email)" || true
else
    echo "⚠️  No Git configuration found, you may need to set it up manually"
fi

# Test SSH agent forwarding
if [ -n "$SSH_AUTH_SOCK" ] && [ -S "$SSH_AUTH_SOCK" ]; then
    echo "✅ SSH agent forwarding is working"
    ssh-add -l >/dev/null 2>&1 && echo "   - SSH keys are loaded" || echo "   - No SSH keys loaded"
else
    echo "⚠️  SSH agent forwarding not detected"
fi

# Test GPG setup
if command -v gpg >/dev/null 2>&1 && gpg --list-secret-keys >/dev/null 2>&1; then
    echo "✅ GPG keys are available"
    GPG_KEYS=$(gpg --list-secret-keys --keyid-format LONG 2>/dev/null | grep sec | wc -l)
    echo "   - Found $GPG_KEYS secret key(s)"
else
    echo "ℹ️  No GPG keys found (optional for commit signing)"
fi

echo "🎉 Container setup completed!"
