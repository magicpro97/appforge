import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Framework, Backend, ModuleResult } from '../types/index.js';

export async function setupCopilot(
  framework: Framework,
  backend: Backend,
  projectPath: string
): Promise<ModuleResult> {
  const filesCreated: string[] = [];

  // Create .github/agents/
  const agentsDir = join(projectPath, '.github', 'agents');
  mkdirSync(agentsDir, { recursive: true });

  const frameworkNames: Record<string, string> = {
    expo: 'Expo (React Native)',
    flutter: 'Flutter',
    nextjs: 'Next.js',
    'vite-react': 'Vite + React',
    'vite-vue': 'Vite + Vue',
    'vite-svelte': 'Vite + Svelte',
    astro: 'Astro',
  };

  const agentContent = `---
name: project-assistant
description: AI assistant for this ${frameworkNames[framework] || framework} project
---

# Project Assistant

You are an AI assistant for a **${frameworkNames[framework] || framework}** project${backend !== 'none' ? ` with **${backend}** backend` : ''}.

## Tech Stack
- Framework: ${frameworkNames[framework] || framework}
${backend !== 'none' ? `- Backend: ${backend}` : ''}

## Guidelines
- Follow the project's coding conventions and patterns
- Use TypeScript for type safety
- Write clean, maintainable code
- Include error handling and loading states
- Follow the project structure conventions

## Code Style
- Use functional components and hooks${framework === 'flutter' ? '\n- Follow Flutter/Dart conventions' : ''}
- Keep components small and focused
- Use proper TypeScript types (avoid \`any\`)
- Handle errors gracefully with user-friendly messages
`;

  writeFileSync(join(agentsDir, 'project-assistant.md'), agentContent, 'utf-8');
  filesCreated.push('.github/agents/project-assistant.md');

  // Create .github/instructions/
  const instructionsDir = join(projectPath, '.github', 'instructions');
  mkdirSync(instructionsDir, { recursive: true });

  const instructionsContent = `# Coding Instructions

## Project Overview
This is a ${frameworkNames[framework] || framework} project${backend !== 'none' ? ` using ${backend} as the backend` : ''}.

## Conventions
- Use TypeScript strict mode
- Follow ESLint rules configured in the project
- Write meaningful commit messages
- Keep functions focused and under 50 lines when possible
- Add JSDoc comments for public APIs

## File Organization
- Components go in \`src/components/\`
- Utilities go in \`src/lib/\` or \`src/utils/\`
- Types go in \`src/types/\`
- API/backend logic goes in \`src/lib/\`
`;

  writeFileSync(join(instructionsDir, 'coding.md'), instructionsContent, 'utf-8');
  filesCreated.push('.github/instructions/coding.md');

  return {
    success: true,
    message: 'Copilot agents and instructions generated',
    filesCreated,
    packagesInstalled: [],
  };
}
