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

## Code Quality Tools

- **Formatting**: Prettier (client) and Ruff (server) - `yarn format:all`
- **Linting**: ESLint (client) and Ruff (server) - `yarn lint:all`
- **Type Checking**: TypeScript (client) and mypy (server) - `yarn typecheck:all`

Run format checks without modifying files: `yarn formatcheck:all`
