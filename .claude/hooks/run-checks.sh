#!/bin/bash

# Claude hook script to run linting and type checking after file modifications
# This script runs in the project root directory
# Exit code 2 makes errors blocking - Claude will automatically handle them

echo "🔍 Running code quality checks..."

# Read hook input from stdin
if [ -t 0 ]; then
    # No stdin, use fallback
    MODIFIED_FILE="${1:-}"
else
    # Parse JSON input from stdin
    HOOK_INPUT=$(cat)
    TOOL_NAME=$(echo "$HOOK_INPUT" | jq -r '.tool_name // empty')
    TOOL_INPUT=$(echo "$HOOK_INPUT" | jq -r '.tool_input // empty')
    MODIFIED_FILE=$(echo "$TOOL_INPUT" | jq -r '.file_path // empty')
fi

# Function to check if a file is in the client directory
is_client_file() {
    [[ "$1" =~ ^client/ ]] || [[ "$1" =~ ^./client/ ]]
}

# Function to check if a file is in the server directory
is_server_file() {
    [[ "$1" =~ ^server/ ]] || [[ "$1" =~ ^./server/ ]]
}

# Run appropriate checks based on modified file location
if [[ -n "$MODIFIED_FILE" ]]; then
    if is_client_file "$MODIFIED_FILE"; then
        echo "📦 Client file modified: $MODIFIED_FILE"
        cd "$CLAUDE_PROJECT_DIR"
        
        # Run checks and use exit code 2 for blocking errors
        echo "Running lint check..." >&2
        if ! OUTPUT=$(yarn workspace client lint 2>&1); then
            echo "❌ Linting failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running type check..." >&2
        if ! OUTPUT=$(yarn workspace client typecheck 2>&1); then
            echo "❌ Type checking failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running format check..." >&2
        if ! OUTPUT=$(yarn workspace client formatcheck 2>&1); then
            echo "❌ Formatting check failed:" >&2
            echo "$OUTPUT" >&2
            echo "" >&2
            echo "💡 Run 'yarn workspace client format' to fix formatting issues." >&2
            exit 2
        fi
        
    elif is_server_file "$MODIFIED_FILE"; then
        echo "🐍 Server file modified: $MODIFIED_FILE"
        cd "$CLAUDE_PROJECT_DIR"
        
        # Run checks and use exit code 2 for blocking errors
        echo "Running lint check..." >&2
        if ! OUTPUT=$(yarn workspace server lint 2>&1); then
            echo "❌ Linting failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running type check..." >&2
        if ! OUTPUT=$(yarn workspace server typecheck 2>&1); then
            echo "❌ Type checking failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running format check..." >&2
        if ! OUTPUT=$(yarn workspace server formatcheck 2>&1); then
            echo "❌ Formatting check failed:" >&2
            echo "$OUTPUT" >&2
            echo "" >&2
            echo "💡 Run 'yarn workspace server format' to fix formatting issues." >&2
            exit 2
        fi
        
    else
        echo "📂 File outside client/server, running all checks..."
        cd "$CLAUDE_PROJECT_DIR"
        
        # Run checks and use exit code 2 for blocking errors
        echo "Running lint check..." >&2
        if ! OUTPUT=$(yarn lint:all 2>&1); then
            echo "❌ Linting failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running type check..." >&2
        if ! OUTPUT=$(yarn typecheck:all 2>&1); then
            echo "❌ Type checking failed:" >&2
            echo "$OUTPUT" >&2
            exit 2
        fi
        
        echo "Running format check..." >&2
        if ! OUTPUT=$(yarn formatcheck:all 2>&1); then
            echo "❌ Formatting check failed:" >&2
            echo "$OUTPUT" >&2
            echo "" >&2
            echo "💡 Run 'yarn format:all' to fix formatting issues." >&2
            exit 2
        fi
    fi
else
    # No specific file provided, skip checks
    echo "ℹ️ No file specified, skipping checks"
    exit 0
fi

echo "✅ All checks passed!"