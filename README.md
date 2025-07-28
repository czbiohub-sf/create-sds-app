# Create SDS App Template With FastAPI

## Prerequisites

- Node.js v20 or above
- Yarn v4
- uv v0.7.5 or above (Python package manager)

## TODO

- [ ] Automatic FastAPI type generation for TypeScript
- [ ] Okta auth
- [ ] Mock users
- [ ] Cypress setup

## Development Setup

1. Install client dependencies:

```bash
yarn install
```

2. Install server dependencies:

```bash
cd server && uv sync
```

3. Run the development server (which runs the client and server in parallel):

```bash
# This command can be ran from anywhere in the project
yarn dev:all
```

The Next.js app will be available at `http://localhost:3000` and the FastAPI server will be available at `http://localhost:8000`.

### Claude Code Integration

This project includes Claude Code hooks that automatically run linting, type checking, and format checking after file modifications.

To activate the hooks:
1. Run `/hooks` in Claude Code
2. Press Enter on "PostToolUse" to accept the hook (this is a safety confirmation)
3. Restart Claude Code to ensure the hooks are fully loaded

**Note:** These hooks only run when using Claude Code. They don't affect regular development or git commits.

## Code Quality Tools

- **Formatting**: Prettier (client) and Ruff (server) - `yarn format:all`
- **Linting**: ESLint (client) and Ruff (server) - `yarn lint:all`
- **Type Checking**: TypeScript (client) and mypy (server) - `yarn typecheck:all`

Run format checks without modifying files: `yarn formatcheck:all`
