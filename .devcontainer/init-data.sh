#!/bin/bash
set -e

echo "🚀 Initializing devcontainer data..."

# Ensure data directory exists
DATA_DIR=".devcontainer/data"
mkdir -p "$DATA_DIR"

# Create zsh_history file if it doesn't exist
HISTORY_FILE="$DATA_DIR/zsh_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "📝 Creating zsh history file..."
    touch "$HISTORY_FILE"
    chmod 600 "$HISTORY_FILE"
fi

# Create other necessary files/directories
echo "✅ Devcontainer data initialized successfully!"
echo "💡 You can now start your devcontainer."
