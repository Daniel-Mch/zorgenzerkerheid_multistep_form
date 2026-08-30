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

## Architectuurkeuzes en eventuele afwegingen

- **Vite**: snelle, zero-config dev server/HMR — de standaardkeuze voor een afgebakende React+TS-app.
- **Vitest**: deelt dezelfde config- en transform-pipeline als Vite, dus geen tweede build tool nodig naast Vite zelf.
- **`FormReducer`** custom voor de stapnavigatie, los van de formulierdata (die via React Hook Form + Zod loopt). Isolated logica om te testen.
- **Zod** voor schema-validatie, gekoppeld aan React Hook Form via `zodResolver`.
- Het gebruik van MultiStepForm.hooks.ts maakt de MultiStepForm leesbaarder.
- Custom component library met Zorg en zekerheid huistijl.

## Wat je anders zou doen met meer tijd

- De **FormReducer** dit schaalt niet verder dan de omvang van dit formulier (een paar velden, geen asynchrone of cross-field validatie). Met de huidige data structuur uit de backend had ik de aantal keys kunnen gebruiken als het aantal stappen plus de persoonlijke gegevens.
- SubmissionPayload & RegistrationFormValues type refactoring met z.infer.
- Add a catch for submitApplication POST.
- Confirmation component instead of conditional markup. Niet nodig als we routing hadden voor een confirmation url.
- Extra Tailwind global styling & components voor cards, containers en responsiveness for DRYer classNames.
- FormNavigation component voor de naviation buttons van de form.
- Global component voor inputs & validation message.
- Global component voor Error notification.
- Global component voor loading state.
- Accessibility markup checks.
- Refactor ReviewModal hook & price calculation util to own files.
- Beter UX voor mobile scrolling.
