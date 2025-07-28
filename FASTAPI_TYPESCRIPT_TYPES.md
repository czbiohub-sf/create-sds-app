# FastAPI TypeScript Type Generation Implementation Plan

## Overview

This document outlines the implementation of automatic type generation from FastAPI to TypeScript, providing a smooth tRPC-like developer experience using **@hey-api/openapi-ts** with its built-in TanStack Query plugin.

## Benefits

- **Automatic type generation** from FastAPI's OpenAPI schema
- **TanStack Query hooks** with full TypeScript support
- **Minimal configuration** for a smooth developer experience
- **Type safety** across client and server
- **Auto-completion** in your IDE
- **React Query benefits** (caching, background refetching, optimistic updates)
- **Simple usage** like `const { data } = useGetItems()`

## Implementation Steps

### 1. Server Setup

#### Add Pydantic Models
```python
from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
```

#### Configure CORS
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Ensure OpenAPI Schema Access
FastAPI automatically generates OpenAPI schema at `/openapi.json`

### 2. Client Setup

#### Install Dependencies
```bash
cd client
yarn add @hey-api/openapi-ts @tanstack/react-query
yarn add -D @hey-api/openapi-ts
```

#### Create OpenAPI-TS Configuration
Create `client/openapi-ts.config.ts`:
```typescript
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'http://localhost:8000/openapi.json',
  output: {
    path: './src/api/generated',
    format: 'prettier',
    lint: 'eslint',
  },
  plugins: [
    '@hey-api/schemas',
    '@hey-api/sdk',
    {
      name: '@hey-api/plugin-tanstack-react-query',
      options: {
        queryOptions: true,
        mutationOptions: true,
      },
    },
  ],
});
```

#### Set Up TanStack Query Provider
Update `client/app/providers.tsx`:
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 3. Type Generation Pipeline

#### Add Generation Scripts
Update `client/package.json`:
```json
{
  "scripts": {
    "generate": "openapi-ts",
    "predev": "yarn generate",
    "dev": "next dev",
    "generate:watch": "nodemon --watch ../server --ext py --exec 'yarn generate'"
  }
}
```

#### Configure API Client Base URL
Create `client/src/api/client.ts`:
```typescript
import { createClient } from './generated/client';

export const apiClient = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});
```

### 4. Usage Example

#### Using Generated Hooks
```typescript
'use client';

import { useGetItems, useGetItemsItemId, useCreateItem } from '@/api/generated/hooks';
import { useState } from 'react';

export function ItemsList() {
  const { data: items, isLoading, error } = useGetItems();
  const createItemMutation = useCreateItem();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items?.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>${item.price}</span>
        </div>
      ))}
      
      <button
        onClick={() => {
          createItemMutation.mutate({
            body: {
              name: 'New Item',
              price: 99.99,
            },
          });
        }}
      >
        Add Item
      </button>
    </div>
  );
}
```

### 5. Development Workflow

1. **Start FastAPI server**: `cd server && yarn dev`
2. **Generate types**: `cd client && yarn generate`
3. **Start Next.js client**: `cd client && yarn dev`

The types will be automatically regenerated when you run `yarn dev` in the client.

### 6. Optional: CI/CD Integration

#### GitHub Actions Workflow
Create `.github/workflows/generate-types.yml`:
```yaml
name: Generate TypeScript Types

on:
  push:
    paths:
      - 'server/**/*.py'
  pull_request:
    paths:
      - 'server/**/*.py'

jobs:
  generate:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          
      - name: Install server dependencies
        run: |
          cd server
          pip install -r requirements.txt
          
      - name: Start FastAPI server
        run: |
          cd server
          uvicorn main:app --host 0.0.0.0 --port 8000 &
          sleep 5
          
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install client dependencies
        run: |
          cd client
          yarn install
          
      - name: Generate types
        run: |
          cd client
          yarn generate
          
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore: update generated types'
          file_pattern: 'client/src/api/generated/**'
```

## Best Practices

1. **Always use Pydantic models** in FastAPI for better type generation
2. **Keep generated files in git** for better IDE support and CI/CD
3. **Don't manually edit generated files** - they will be overwritten
4. **Use query key factories** for cache invalidation
5. **Configure proper error handling** in TanStack Query

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure FastAPI CORS middleware is properly configured
2. **Type generation fails**: Check if FastAPI server is running and accessible
3. **Missing types**: Verify Pydantic models are used in all endpoints
4. **Stale types**: Run `yarn generate` after API changes

### Debugging Tips

- Check generated files in `client/src/api/generated/`
- Verify OpenAPI schema at `http://localhost:8000/openapi.json`
- Use React Query Devtools to inspect cache and queries
- Enable verbose logging in openapi-ts config for debugging

## Alternative Approaches

If you need more customization:

1. **openapi-typescript + openapi-fetch**: More control over generated code
2. **openapi-react-query-codegen**: Dedicated React Query code generator
3. **Custom hooks**: Build your own hooks on top of generated types

## Resources

- [@hey-api/openapi-ts Documentation](https://heyapi.dev/openapi-ts/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [OpenAPI Specification](https://www.openapis.org/)