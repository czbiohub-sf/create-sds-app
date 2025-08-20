# Development Guidelines

## UI Development Requirements

### Use SDS Components Only

- **MANDATORY**: Use components from the `@czi-sds/components` library for ALL UI elements
- **DO NOT** use standard Material UI components directly unless there is no SDS equivalent
- If no SDS component exists for your needs, use Material UI components (already installed)

### Styling Guidelines

#### How to Apply Styles

- Use SDS Tailwind CSS classes in the `className` prop of your JSX elements
- The SDS Tailwind configuration is automatically included via `tailwind.config.js`
- Refer to `client/app/page.tsx` for examples
- All available SDS-specific Tailwind classes are documented in `client/docs/SDS Tailwind.json`

#### Text Styling

- Use SDS-themed `prose-*` classes for ALL text in the application
- These classes automatically apply correct fonts, sizes, and spacing
- Examples:
  - Headers: `prose-sds-header-l-600-wide`
  - Body text: `prose-sds-body-m-400-wide`

### Component Documentation

- **CRITICAL**: The project has SDS MCP (Model Context Protocol) configured for enhanced development assistance with SDS components. Always use the SDS MCP server to look up component documentation when working with @czi-sds/components library. The SDS MCP server provides comprehensive documentation including component props, usage examples, and implementation details. Use tools like `get_component_docs`, `get_component_props`, and `list_components` to retrieve accurate and up-to-date information about SDS components before implementing them.
- **Component Reference**: See `client/docs/SDS UI Components Documentation for AI.md` for:
  - Available SDS components
  - Component props
  - Usage examples
- **Style Reference**: The file `client/docs/SDS Tailwind.json` contains all available SDS-specific Tailwind classes
  - **IMPORTANT**: This file is purely a reference for understanding available styles
  - **DO NOT** import this file anywhere in your code
  - The actual SDS Tailwind configuration is already imported and installed in `client/tailwind.config.js`

## Development Best Practices

### TypeScript (Frontend)

- Use TypeScript for all frontend code
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference where appropriate
- Keep components strongly typed with proper prop interfaces

### Python (Backend)

- Use type hints for all function parameters and return values
- Follow PEP 8 style guidelines
- Use pydantic for data validation
- Keep functions small and focused
- Use descriptive variable and function names

### Code Quality

- Follow the existing code patterns in the project
- Keep components and functions modular and reusable
- Write clear, self-documenting code
- Test your changes thoroughly

### Working with the Codebase

- Always check existing components before creating new ones
- Follow the established file structure
- Use the development server (`yarn dev:all`) to preview changes
- Review the frontend documentation files in `client/docs/` for UI component guidance

### Commits

**IMPORTANT**: Use Conventional Commit messages.

The most important prefixes you should have in mind are:

fix: which represents bug fixes, and correlates to a SemVer patch.
feat: which represents a new feature, and correlates to a SemVer minor.
feat!:, or fix!:, refactor!:, etc., which represent a breaking change (indicated by the !) and will result in a SemVer major.
