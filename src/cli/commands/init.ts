import inquirer from 'inquirer';
import chalk from 'chalk';
import type { ProjectConfig, Framework, Backend, AuthMethod, StylingOption, StateManagement, CICDOption } from '../../types/index.js';
import { scaffold } from '../../core/scaffolder.js';

export async function initCommand(name?: string): Promise<void> {
  console.log(chalk.bold.cyan('\n🏗️  AppForge — Project Scaffolding Wizard\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: name || 'my-app',
      when: !name,
      validate: (input: string) => {
        if (!input.trim()) return 'Project name is required';
        if (/[^a-zA-Z0-9-_.]/.test(input)) return 'Project name can only contain letters, numbers, hyphens, underscores, and dots';
        return true;
      },
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Framework:',
      choices: [
        { name: '📱 Expo (React Native)', value: 'expo' },
        { name: '🦋 Flutter', value: 'flutter' },
        { name: '▲  Next.js', value: 'nextjs' },
        { name: '⚡ Vite + React', value: 'vite-react' },
        { name: '⚡ Vite + Vue', value: 'vite-vue' },
        { name: '⚡ Vite + Svelte', value: 'vite-svelte' },
        { name: '🚀 Astro', value: 'astro' },
      ],
    },
    {
      type: 'list',
      name: 'backend',
      message: 'Backend:',
      choices: [
        { name: '⚡ Supabase', value: 'supabase' },
        { name: '🔥 Firebase', value: 'firebase' },
        { name: '📦 PocketBase', value: 'pocketbase' },
        { name: '🏗️  Appwrite', value: 'appwrite' },
        { name: '🚫 None', value: 'none' },
      ],
    },
    {
      type: 'checkbox',
      name: 'auth',
      message: 'Authentication methods:',
      choices: [
        { name: '📧 Email/Password', value: 'email' },
        { name: '🌐 Social (Google/Apple/GitHub)', value: 'social' },
        { name: '✨ Magic Link', value: 'magic-link' },
        { name: '🚫 None', value: 'none' },
      ],
      default: ['none'],
      validate: (input: string[]) => {
        if (input.length === 0) return 'Select at least one option';
        return true;
      },
    },
    {
      type: 'list',
      name: 'styling',
      message: 'Styling:',
      choices: (answers: { framework: Framework }) => {
        const choices = [
          { name: '🎨 Tailwind CSS', value: 'tailwind' },
          { name: '💅 styled-components', value: 'styled-components' },
          { name: '📦 CSS Modules', value: 'css-modules' },
          { name: '🚫 None', value: 'none' },
        ];
        if (answers.framework === 'expo') {
          choices.splice(1, 0, { name: '🌊 NativeWind', value: 'nativewind' });
        }
        return choices;
      },
    },
    {
      type: 'list',
      name: 'stateManagement',
      message: 'State management:',
      choices: (answers: { framework: Framework }) => {
        if (answers.framework === 'flutter') {
          return [
            { name: '🔄 Riverpod', value: 'riverpod' },
            { name: '📦 Provider', value: 'provider' },
            { name: '🚫 None', value: 'none' },
          ];
        }
        return [
          { name: '🐻 Zustand', value: 'zustand' },
          { name: '🔄 Redux', value: 'redux' },
          { name: '🚫 None', value: 'none' },
        ];
      },
    },
    {
      type: 'list',
      name: 'cicd',
      message: 'CI/CD:',
      choices: [
        { name: '🔄 GitHub Actions', value: 'github-actions' },
        { name: '🚫 None', value: 'none' },
      ],
    },
    {
      type: 'confirm',
      name: 'copilotAgents',
      message: 'Generate Copilot agents (.github/agents/)?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'generateReadme',
      message: 'Generate README?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'generateLandingPage',
      message: 'Generate landing page skeleton?',
      default: false,
    },
  ]);

  const config: ProjectConfig = {
    name: name || answers.name,
    framework: answers.framework as Framework,
    backend: answers.backend as Backend,
    auth: answers.auth as AuthMethod[],
    styling: answers.styling as StylingOption,
    stateManagement: answers.stateManagement as StateManagement,
    cicd: answers.cicd as CICDOption,
    copilotAgents: answers.copilotAgents,
    generateReadme: answers.generateReadme,
    generateLandingPage: answers.generateLandingPage,
  };

  await scaffold(config);
}
