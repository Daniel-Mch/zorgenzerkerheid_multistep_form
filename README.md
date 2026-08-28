# Zorgverzekering Multistep Form

A multistep form for signing up for an insurance plan.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server & build tool
- [Tailwind CSS v4](https://tailwindcss.com/) — styling, via `@tailwindcss/vite`
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (via `@hookform/resolvers`) — form state & schema validation
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) — unit/component testing
- [ESLint](https://eslint.org/) — linting

## Prerequisites

- **Node.js `22.23.2`** (see `.nvmrc` / `.tool-versions`)
- npm (ships with Node)

If you use a version manager, run one of the following from the project root to pick up the correct Node version automatically:

```bash
# nvm
nvm use

# asdf
asdf install
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

   The app will be available at the URL printed in the terminal (default [http://localhost:5173](http://localhost:5173)).

## Available scripts

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm run dev`      | Start the Vite dev server with HMR                     |
| `npm run build`    | Type-check and build the app for production to `dist/` |
| `npm run preview`  | Preview the production build locally                   |
| `npm run lint`     | Run ESLint                                             |
| `npm run test`     | Run Vitest in watch mode                               |
| `npm run test:run` | Run Vitest once (CI mode)                              |
| `npm run test:ui`  | Run Vitest with the interactive UI                     |

## Testing

Tests live in [`src/test/`](src/test/), separate from the source files they cover.

Run the full suite once (CI mode):

```bash
npm run test:run
```

Run in watch mode while developing:

```bash
npm run test
```

Run with the interactive Vitest UI:

```bash
npm run test:ui
```
