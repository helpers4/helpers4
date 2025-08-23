#!/bin/bash
set -e

echo "🔄 Migrating shell history to new devcontainer feature..."

# Find project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Old history location
OLD_HISTORY=".devcontainer/data/shell/zsh_history"
# New history location (will be managed by the feature)
NEW_HISTORY_DIR="/workspaces/.shell-history"

if [ -f "$OLD_HISTORY" ]; then
    echo "📁 Found existing history file: $OLD_HISTORY"
    
    # Create new directory if it doesn't exist
    mkdir -p "$NEW_HISTORY_DIR"
    
    # Copy existing history
    echo "📝 Copying existing history to new location..."
    cp "$OLD_HISTORY" "$NEW_HISTORY_DIR/zsh_history"
    
    # Set proper permissions
    chmod 644 "$NEW_HISTORY_DIR/zsh_history"
    
    echo "✅ History migrated successfully!"
    echo "💡 You can now remove the old data directory if you want:"
    echo "   rm -rf .devcontainer/data/"
else
    echo "ℹ️  No existing history found - nothing to migrate"
fi

echo "🎉 Migration completed!"
