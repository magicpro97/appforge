import chalk from 'chalk';
import ora from 'ora';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { setupAuth } from '../../modules/auth.js';
import { setupBackend } from '../../modules/backend.js';
import { setupStyling } from '../../modules/styling.js';
import { setupCICD } from '../../modules/cicd.js';
import { setupCopilot } from '../../modules/copilot.js';

const SUPPORTED_MODULES = ['auth', 'analytics', 'push', 'payments'] as const;

export async function addCommand(module: string): Promise<void> {
  const projectPath = process.cwd();

  if (!SUPPORTED_MODULES.includes(module as typeof SUPPORTED_MODULES[number])) {
    console.log(chalk.red(`\n❌ Unknown module: ${module}`));
    console.log(chalk.white(`\nAvailable modules: ${SUPPORTED_MODULES.join(', ')}`));
    return;
  }

  // Try to detect project type
  const hasPackageJson = existsSync(join(projectPath, 'package.json'));
  const hasPubspec = existsSync(join(projectPath, 'pubspec.yaml'));

  if (!hasPackageJson && !hasPubspec) {
    console.log(chalk.red('\n❌ No project found in current directory'));
    console.log(chalk.gray('Run this command from your project root'));
    return;
  }

  const spinner = ora(`Adding ${module} module...`).start();

  try {
    switch (module) {
      case 'auth': {
        const result = await setupAuth(['email', 'social'], 'none', projectPath);
        if (result.success) {
          spinner.succeed(chalk.green(result.message));
          if (result.filesCreated.length > 0) {
            console.log(chalk.gray('\n  Files created:'));
            result.filesCreated.forEach(f => console.log(chalk.gray(`    • ${f}`)));
          }
        } else {
          spinner.fail(chalk.red(result.message));
        }
        break;
      }

      case 'analytics': {
        spinner.succeed(chalk.green('Analytics module scaffolded'));
        console.log(chalk.gray('\n  TODO: Install your preferred analytics SDK'));
        console.log(chalk.gray('  Supported: Mixpanel, Amplitude, PostHog'));
        break;
      }

      case 'push': {
        spinner.succeed(chalk.green('Push notifications module scaffolded'));
        console.log(chalk.gray('\n  TODO: Configure push notification service'));
        console.log(chalk.gray('  Supported: Firebase Cloud Messaging, OneSignal, Expo Notifications'));
        break;
      }

      case 'payments': {
        spinner.succeed(chalk.green('Payments module scaffolded'));
        console.log(chalk.gray('\n  TODO: Configure payment provider'));
        console.log(chalk.gray('  Supported: Stripe, RevenueCat, LemonSqueezy'));
        break;
      }
    }
  } catch (error) {
    spinner.fail(chalk.red(`Failed to add ${module}: ${error}`));
  }
}
