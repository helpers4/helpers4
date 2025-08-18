#!/bin/bash
set -e

echo "🔧 Setting up devcontainer environment..."

# Create SSH directory with proper permissions
echo "📁 Setting up SSH directory..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Set up GPG directory permissions (if mounted)
if [ -d ~/.gnupg ]; then
    echo "🔐 Setting up GPG permissions..."
    chmod 700 ~/.gnupg 2>/dev/null || true
    chmod 600 ~/.gnupg/* 2>/dev/null || true
fi

# Configure Git if needed
if [ -f ~/.gitconfig ]; then
    echo "✅ Git configuration found"
else
    echo "⚠️  No Git configuration found, you may need to set it up manually"
fi

# Test SSH agent forwarding
if [ -n "$SSH_AUTH_SOCK" ] && [ -S "$SSH_AUTH_SOCK" ]; then
    echo "✅ SSH agent forwarding is working"
else
    echo "⚠️  SSH agent forwarding not detected"
fi

# Test GPG setup
if command -v gpg >/dev/null 2>&1 && gpg --list-secret-keys >/dev/null 2>&1; then
    echo "✅ GPG keys are available"
else
    echo "ℹ️  No GPG keys found (optional for commit signing)"
fi

echo "🎉 Container setup completed!"
