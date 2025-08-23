#!/bin/bash
set -e

echo "🧹 Cleaning devcontainer cache and rebuilding..."

PROJECT_PATH="/home/berenger/Projects/baxyz/helpers4"

# Clean Docker containers for this project
echo "🗑️  Removing old containers..."
docker ps -aq --filter label=devcontainer.local_folder="$PROJECT_PATH" | xargs -r docker rm -f

# Clean Docker images for this project  
echo "🗑️  Removing old images..."
docker images | grep helpers4 | awk '{print $3}' | xargs -r docker rmi -f

# Clean Docker build cache
echo "🗑️  Cleaning build cache..."
docker system prune -f

# Verify data structure
echo "📁 Verifying data structure..."
if [ -f "$PROJECT_PATH/.devcontainer/data/shell/zsh_history" ]; then
    echo "   ✅ zsh_history file exists"
else
    echo "   ❌ zsh_history file missing, creating..."
    mkdir -p "$PROJECT_PATH/.devcontainer/data/shell"
    touch "$PROJECT_PATH/.devcontainer/data/shell/zsh_history"
fi

echo "✨ Cleanup complete!"
echo "💡 You can now restart VS Code and 'Reopen in Container'"
