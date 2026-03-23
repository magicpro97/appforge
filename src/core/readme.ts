import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { ProjectConfig } from '../types/index.js';

export function generateReadme(config: ProjectConfig, projectPath: string): void {
  const frameworkNames: Record<string, string> = {
    expo: 'Expo (React Native)',
    flutter: 'Flutter',
    nextjs: 'Next.js',
    'vite-react': 'Vite + React',
    'vite-vue': 'Vite + Vue',
    'vite-svelte': 'Vite + Svelte',
    astro: 'Astro',
  };

  const content = `# ${config.name}

> Scaffolded with [AppForge](https://github.com/magicpro97/appforge) 🏗️

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | ${frameworkNames[config.framework] || config.framework} |
| Backend | ${config.backend === 'none' ? 'None' : config.backend} |
| Auth | ${config.auth.includes('none') ? 'None' : config.auth.join(', ')} |
| Styling | ${config.styling === 'none' ? 'None' : config.styling} |
| State | ${config.stateManagement === 'none' ? 'None' : config.stateManagement} |
| CI/CD | ${config.cicd === 'none' ? 'None' : 'GitHub Actions'} |

## Getting Started

\`\`\`bash
cd ${config.name}
${config.framework === 'flutter' ? 'flutter run' : 'npm install\nnpm run dev'}
\`\`\`

## Project Structure

\`\`\`
${config.name}/
├── src/              # Application source code
├── ${config.cicd !== 'none' ? '.github/          # CI/CD workflows\n├── ' : ''}README.md
└── package.json
\`\`\`

## Scripts

${config.framework === 'flutter'
    ? '- `flutter run` — Start the app\n- `flutter test` — Run tests\n- `flutter build` — Build for production'
    : '- `npm run dev` — Start development server\n- `npm run build` — Build for production\n- `npm run test` — Run tests'}

## License

MIT
`;

  mkdirSync(projectPath, { recursive: true });
  writeFileSync(join(projectPath, 'README.md'), content, 'utf-8');
}
