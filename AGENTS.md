# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js 14 App Router pages, layouts, and route handlers (e.g., `app/(authenticated)`, `app/change-log`).
- `src/features`: Feature modules and UI components (chat, persona, extensions, auth, theme, common, ui).
- `src/public`: Static assets served by Next.js.
- `src/types`: Shared TypeScript types.
- Config: `src/tsconfig.json`, `src/next.config.js`, `src/tailwind.config.*`, `src/.eslintrc.json`.
- Docs & infra: `docs/`, `azure.yaml`, `infra/`, `.devcontainer/`.

## Build, Test, and Development Commands
Run all commands from `src/`.
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Create production build.
- `npm start`: Run the production build locally.
- `npm run lint`: Lint the codebase.
Example: `cd src && cp .env.example .env.local && npm install && npm run dev`.

## Coding Style & Naming Conventions
- Language: TypeScript/React, Next.js App Router, TailwindCSS.
- Indentation: 2 spaces; prefer named exports; avoid default unless conventional.
- Filenames: `kebab-case` for files/dirs; `PascalCase` for React components; `camelCase` for variables/functions.
- Linting: ESLint via `npm run lint` (Next.js config). Keep imports sorted, no unused vars.
- UI: Co-locate component styles; prefer existing utilities in `features/ui`.

## Testing Guidelines
- Current repo has no formal test suite. If adding tests, use colocated files: `Component.test.tsx` or `util.test.ts` next to sources.
- Aim for fast unit tests over E2E first; mock Azure services.
- Keep coverage meaningful around data parsing, API handlers, and auth flows.

## Commit & Pull Request Guidelines
- Commits: Prefer Conventional Commits (e.g., `feat:`, `fix:`, `chore:`). Example: `feat(chat): stream assistant tokens to UI`.
- PRs: Include summary, linked issues, screenshots/GIFs for UI, and steps to validate. Ensure `npm run lint` and `npm run build` pass.
- Keep PRs focused and small; update docs when behavior changes.

## Security & Configuration Tips
- Never commit secrets. Use `src/.env.local` (see `src/.env.example`). For production, prefer Azure Key Vault.
- Required services: Azure OpenAI, Cosmos DB (history), optional: Azure AI Search, Speech, Storage.
- Review `docs/3-run-locally.md` and `docs/9-environment-variables.md` before running or deploying (`azd up`).

