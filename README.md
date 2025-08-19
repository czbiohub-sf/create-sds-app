# Create SDS App Template With FastAPI

## Prerequisites

- Node.js v20 or above
- Yarn v4
- uv v0.7.5 or above (Python package manager)
- Docker and Docker Compose

## TODO

- [x] Automatic FastAPI type generation for TypeScript
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

3. Make sure Docker is running (required for PostgreSQL database)

4. Run the development server (which runs the client, server, and database):

```bash
# This command can be ran from anywhere in the project
yarn dev:all
```

The Next.js app will be available at `http://localhost:3000`, the FastAPI server will be available at `http://localhost:8000`, and the database admin interface at `http://localhost:8000/admin`.

### TypeScript Type Generation from OpenAPI

This project automatically generates TypeScript types from the FastAPI OpenAPI schema:

```bash
# Generate types manually (can be run from anywhere in the project)
yarn generate
```

The generated types are saved to `client/src/api/generated/types.ts` and provide full type safety when using the `openapi-fetch` client.

**Note:** Make sure the FastAPI server is running on `http://localhost:8000` before generating types. You'll need to run this after making changes to your FastAPI endpoints.

### Claude Code Integration

This project includes Claude Code hooks that automatically run linting, type checking, and format checking after file modifications.

To activate the hooks:

1. Run `/hooks` in Claude Code
2. Press Enter on "PostToolUse" to accept the hook (this is a safety confirmation)
3. Restart Claude Code to ensure the hooks are fully loaded

**Important:** If you modify the hook scripts (`.claude/hooks/`), you need to repeat these steps to reload the updated hooks.

**Note:** These hooks only run when using Claude Code. They don't affect regular development or git commits.

### Devin AI Integration

During the "Repo Setup" step in Devin, use the following configuration:

- **Pull Latest Repo**:

(Leave as is)

- **Update Dependencies**:

```
yarn install && cd server && uv sync
```

- **Run Lint**: (put as separate commands in the list)

```
yarn workspace client lint --fix
yarn workspace server lint --fix
yarn format:all
yarn lint:all
yarn typecheck:all
```

- **Run Tests**:

None

- **Run App**:

```
yarn dev:all
```

- **Repo Note:**

Optional

**Note**: The `CLAUDE.md` file containing project-specific knowledge and guidelines is automatically imported by Devin.

## Code Quality Tools

- **Formatting**: Prettier (client) and Ruff (server) - `yarn format:all`
- **Linting**: ESLint (client) and Ruff (server) - `yarn lint:all`
- **Type Checking**: TypeScript (client) and mypy (server) - `yarn typecheck:all`

Run format checks without modifying files: `yarn formatcheck:all`
