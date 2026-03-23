---
applyTo: "**/*.ts"
---

# AppForge Development Instructions

This is the **AppForge CLI** project — a universal app scaffolding wizard that creates complete projects with framework, backend, auth, styling, CI/CD, and Copilot agents.

## Architecture

### Core (`src/core/`)
- `config.ts` — Config management at `~/.appforge/config.json`
- `scaffolder.ts` — Main scaffolding orchestrator
- `templates.ts` — Template management (save/load reusable configs)
- `readme.ts` — README generation for scaffolded projects
- `landing.ts` — Landing page generation

### Generators (`src/generators/`)
- `expo.ts` — Expo (React Native) project generator (wraps `npx create-expo-app`)
- `flutter.ts` — Flutter project generator (wraps `flutter create`)
- `nextjs.ts` — Next.js project generator (wraps `npx create-next-app`)
- `vite.ts` — Vite project generator for React/Vue/Svelte (wraps `npm create vite`)
- `astro.ts` — Astro project generator

### Modules (`src/modules/`)
- `auth.ts` — Authentication module (adds auth to existing projects)
- `backend.ts` — Backend module (Supabase, Firebase, PocketBase, Appwrite)
- `styling.ts` — Styling module (Tailwind, NativeWind, etc.)
- `cicd.ts` — CI/CD module (GitHub Actions)
- `copilot.ts` — Copilot agents module

### CLI Commands (`src/cli/commands/`)
- `init.ts` — Interactive wizard to create a new project
- `add.ts` — Add feature modules to existing projects
- `template.ts` — Template management (list, save)
- `config.ts` — User config management

### Types (`src/types/`)
- `index.ts` — TypeScript interfaces for project config, templates

## Adding a New Generator

1. Create `src/generators/<framework>.ts`
2. Implement the generator function that wraps the framework's CLI
3. Register in the scaffolder's framework selection

## Adding a New Module

1. Create `src/modules/<module>.ts`
2. Implement the module function that adds features to a project
3. Register in the `add` command and scaffolder wizard

## Adding a New Command

1. Create `src/cli/commands/<name>.ts` exporting a `create<Name>Command()` function returning a Commander `Command`
2. Register in `src/index.ts` with `program.addCommand()`
3. Use the spinner + try/catch error handling pattern

## Conventions

- ESM modules (`"type": "module"` in package.json)
- All imports use `.js` extension (TypeScript ESM requirement)
- Dynamic imports for chalk/ora (ESM-only packages): `const chalk = (await import('chalk')).default`
- Node.js 20+ required
- Generators wrap native framework CLIs rather than generating files directly
- Modules add features to existing projects non-destructively

## Build & Run

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript (tsc)
npm run dev          # Build and run
node dist/index.js   # Run CLI directly
```

## Testing

```bash
npm run build
node dist/index.js --version
node dist/index.js --help
node dist/index.js init --help
node dist/index.js add --help
node dist/index.js template --help
```

## CI/CD

- GitHub CI builds on push (`.github/workflows/ci.yml`)
- npm publish is automatic via GitHub Release (`.github/workflows/publish.yml`)
- NPM_TOKEN stored as GitHub repo secret — never commit tokens
