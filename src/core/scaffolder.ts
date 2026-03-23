import { join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import type { ProjectConfig, GeneratorResult } from '../types/index.js';
import { scaffoldExpo } from '../generators/expo.js';
import { scaffoldFlutter } from '../generators/flutter.js';
import { scaffoldNextjs } from '../generators/nextjs.js';
import { scaffoldVite } from '../generators/vite.js';
import { scaffoldAstro } from '../generators/astro.js';
import { setupAuth } from '../modules/auth.js';
import { setupBackend } from '../modules/backend.js';
import { setupStyling } from '../modules/styling.js';
import { setupCICD } from '../modules/cicd.js';
import { setupCopilot } from '../modules/copilot.js';
import { generateReadme } from './readme.js';
import { generateLandingPage } from './landing.js';

export async function scaffold(config: ProjectConfig): Promise<void> {
  const projectPath = join(process.cwd(), config.name);

  console.log(chalk.bold.cyan('\n🏗️  Scaffolding project: ') + chalk.white(config.name));
  console.log(chalk.gray('─'.repeat(50)));

  // Step 1: Framework scaffold
  const spinner = ora('Creating project with framework CLI...').start();
  let result: GeneratorResult;

  try {
    switch (config.framework) {
      case 'expo':
        result = await scaffoldExpo(config.name, projectPath);
        break;
      case 'flutter':
        result = await scaffoldFlutter(config.name, projectPath);
        break;
      case 'nextjs':
        result = await scaffoldNextjs(config.name, projectPath);
        break;
      case 'vite-react':
      case 'vite-vue':
      case 'vite-svelte':
        result = await scaffoldVite(config.name, projectPath, config.framework);
        break;
      case 'astro':
        result = await scaffoldAstro(config.name, projectPath);
        break;
      default:
        throw new Error(`Unsupported framework: ${config.framework}`);
    }

    if (result.success) {
      spinner.succeed(chalk.green(result.message));
    } else {
      spinner.fail(chalk.red(result.message));
      return;
    }
  } catch (error) {
    spinner.fail(chalk.red(`Framework scaffolding failed: ${error}`));
    return;
  }

  // Step 2: Backend setup
  if (config.backend !== 'none') {
    const backendSpinner = ora(`Setting up ${config.backend}...`).start();
    try {
      const backendResult = await setupBackend(config.backend, projectPath);
      if (backendResult.success) {
        backendSpinner.succeed(chalk.green(backendResult.message));
      } else {
        backendSpinner.warn(chalk.yellow(backendResult.message));
      }
    } catch (error) {
      backendSpinner.warn(chalk.yellow(`Backend setup skipped: ${error}`));
    }
  }

  // Step 3: Auth setup
  if (!config.auth.includes('none')) {
    const authSpinner = ora('Configuring authentication...').start();
    try {
      const authResult = await setupAuth(config.auth, config.backend, projectPath);
      if (authResult.success) {
        authSpinner.succeed(chalk.green(authResult.message));
      } else {
        authSpinner.warn(chalk.yellow(authResult.message));
      }
    } catch (error) {
      authSpinner.warn(chalk.yellow(`Auth setup skipped: ${error}`));
    }
  }

  // Step 4: Styling
  if (config.styling !== 'none') {
    const styleSpinner = ora(`Adding ${config.styling}...`).start();
    try {
      const styleResult = await setupStyling(config.styling, config.framework, projectPath);
      if (styleResult.success) {
        styleSpinner.succeed(chalk.green(styleResult.message));
      } else {
        styleSpinner.warn(chalk.yellow(styleResult.message));
      }
    } catch (error) {
      styleSpinner.warn(chalk.yellow(`Styling setup skipped: ${error}`));
    }
  }

  // Step 5: CI/CD
  if (config.cicd !== 'none') {
    const ciSpinner = ora('Generating CI/CD workflows...').start();
    try {
      const ciResult = await setupCICD(config.cicd, config.framework, projectPath);
      if (ciResult.success) {
        ciSpinner.succeed(chalk.green(ciResult.message));
      } else {
        ciSpinner.warn(chalk.yellow(ciResult.message));
      }
    } catch (error) {
      ciSpinner.warn(chalk.yellow(`CI/CD setup skipped: ${error}`));
    }
  }

  // Step 6: Copilot agents
  if (config.copilotAgents) {
    const copilotSpinner = ora('Generating Copilot agents...').start();
    try {
      const copilotResult = await setupCopilot(config.framework, config.backend, projectPath);
      if (copilotResult.success) {
        copilotSpinner.succeed(chalk.green(copilotResult.message));
      } else {
        copilotSpinner.warn(chalk.yellow(copilotResult.message));
      }
    } catch (error) {
      copilotSpinner.warn(chalk.yellow(`Copilot setup skipped: ${error}`));
    }
  }

  // Step 7: README
  if (config.generateReadme) {
    const readmeSpinner = ora('Generating README...').start();
    try {
      generateReadme(config, projectPath);
      readmeSpinner.succeed(chalk.green('README.md generated'));
    } catch (error) {
      readmeSpinner.warn(chalk.yellow(`README generation skipped: ${error}`));
    }
  }

  // Step 8: Landing page
  if (config.generateLandingPage) {
    const landingSpinner = ora('Generating landing page skeleton...').start();
    try {
      generateLandingPage(config, projectPath);
      landingSpinner.succeed(chalk.green('Landing page skeleton generated'));
    } catch (error) {
      landingSpinner.warn(chalk.yellow(`Landing page generation skipped: ${error}`));
    }
  }

  // Summary
  console.log(chalk.gray('\n─'.repeat(50)));
  console.log(chalk.bold.green('\n✅ Project scaffolded successfully!\n'));
  console.log(chalk.white('  Next steps:'));
  console.log(chalk.cyan(`  cd ${config.name}`));

  if (config.framework === 'flutter') {
    console.log(chalk.cyan('  flutter run'));
  } else {
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm run dev'));
  }
  console.log();
}
