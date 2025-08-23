#!/bin/bash
set -e

echo "🚀 Initializing devcontainer data..."

# Find project root (where the .devcontainer folder should be)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "📁 Working in: $PROJECT_ROOT"

# Ensure data directory exists
DATA_DIR=".devcontainer/data"
SHELL_DIR="$DATA_DIR/shell"
mkdir -p "$SHELL_DIR"

# Create zsh_history file if it doesn't exist
HISTORY_FILE="$SHELL_DIR/zsh_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "📝 Creating zsh history file..."
    touch "$HISTORY_FILE"
fi

# Set proper permissions
chmod 644 "$HISTORY_FILE"

# Create other shell-related files if needed in the future
echo "✅ Devcontainer data initialized successfully!"
echo "💡 You can now start your devcontainer."
echo ""
echo "📋 Created/Verified:"
echo "   - $PWD/$HISTORY_FILE ($(ls -la "$HISTORY_FILE" | awk '{print $1, $5}'))"
