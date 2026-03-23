# 🏗️ AppForge

[![npm version](https://img.shields.io/npm/v/appforge.svg)](https://www.npmjs.com/package/appforge)
[![CI](https://github.com/magicpro97/appforge/actions/workflows/ci.yml/badge.svg)](https://github.com/magicpro97/appforge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)

**Universal App Scaffolding CLI** — create complete projects with framework, backend, auth, styling, CI/CD, and Copilot agents in one command.

## Install

```bash
npm install -g appforge
```

## Quick Start

```bash
appforge init my-app
```

The interactive wizard walks you through:

1. **Project name** — name your app
2. **Framework** — Expo, Flutter, Next.js, Vite (React/Vue/Svelte), Astro
3. **Backend** — Supabase, Firebase, PocketBase, Appwrite, or None
4. **Auth** — Email/Password, Social (Google/Apple/GitHub), Magic Link, or None
5. **Styling** — Tailwind, NativeWind, styled-components, CSS Modules, or None
6. **State management** — Zustand, Redux, Riverpod, Provider, or None
7. **CI/CD** — GitHub Actions or None
8. **Copilot agents** — Generate `.github/agents/` and `.github/instructions/`
9. **README** — Auto-generate project README
10. **Landing page** — Generate a landing page skeleton

## Commands

| Command | Description |
|---------|-------------|
| `appforge init [name]` | Interactive wizard to create a new project |
| `appforge add <module>` | Add feature module (auth, analytics, push, payments) |
| `appforge template list` | List available project templates |
| `appforge template save <name>` | Save current config as reusable template |
| `appforge config set <key> <value>` | Set default config value |
| `appforge config list` | Show current configuration |

## Add Modules

Add features to an existing project:

```bash
cd my-app
appforge add auth        # Add authentication boilerplate
appforge add analytics   # Add analytics module
appforge add push        # Add push notifications
appforge add payments    # Add payments integration
```

## Templates

Use built-in templates or save your own:

```bash
# List templates
appforge template list

# Save current project as template
appforge template save my-stack
```

### Built-in Templates

| Template | Stack |
|----------|-------|
| `expo-supabase` | Expo + Supabase + NativeWind + Zustand |
| `flutter-firebase` | Flutter + Firebase + Riverpod |
| `nextjs-supabase` | Next.js + Supabase + Tailwind + Zustand |

## Supported Tech

### Frameworks

| Framework | CLI Used |
|-----------|----------|
| Expo (React Native) | `npx create-expo-app@latest` |
| Flutter | `flutter create` |
| Next.js | `npx create-next-app@latest` |
| Vite (React/Vue/Svelte) | `npm create vite@latest` |
| Astro | `npm create astro@latest` |

### Backends

| Backend | Description |
|---------|-------------|
| Supabase | PostgreSQL + Auth + Storage + Realtime |
| Firebase | Firestore + Auth + Storage + Cloud Functions |
| PocketBase | Open-source backend in a single file |
| Appwrite | Open-source backend platform |

### Auth Methods

- 📧 Email/Password
- 🌐 Social Login (Google, Apple, GitHub)
- ✨ Magic Link

### Styling

- 🎨 Tailwind CSS
- 🌊 NativeWind (React Native)
- 💅 styled-components
- 📦 CSS Modules

## Configuration

Set defaults to skip wizard prompts:

```bash
appforge config set framework nextjs
appforge config set backend supabase
appforge config set styling tailwind
appforge config list
```

## Development

```bash
git clone https://github.com/magicpro97/appforge.git
cd appforge
npm install
npm run build
node dist/index.js init my-app
```

## License

MIT © [magicpro97](https://github.com/magicpro97)
