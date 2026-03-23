import chalk from 'chalk';
import { loadConfig, setConfigValue } from '../../core/config.js';

export async function configCommand(action: string, key?: string, value?: string): Promise<void> {
  switch (action) {
    case 'set': {
      if (!key || !value) {
        console.log(chalk.red('\n❌ Both key and value are required'));
        console.log(chalk.gray('  Usage: appforge config set <key> <value>'));
        console.log(chalk.gray('  Keys: framework, backend, styling, stateManagement, cicd, copilotAgents'));
        return;
      }

      setConfigValue(key, value);
      console.log(chalk.green(`\n✅ Config updated: ${key} = ${value}`));
      break;
    }

    case 'list': {
      const config = loadConfig();
      console.log(chalk.bold.cyan('\n⚙️  AppForge Configuration\n'));
      console.log(chalk.gray('─'.repeat(40)));

      const entries = Object.entries(config);
      if (entries.length === 0) {
        console.log(chalk.gray('  No configuration set'));
        console.log(chalk.gray('  Use: appforge config set <key> <value>'));
      } else {
        for (const [k, v] of entries) {
          if (k === 'templates') continue;
          console.log(chalk.white(`  ${k}: `) + chalk.cyan(String(v)));
        }
      }
      console.log();
      break;
    }

    default:
      console.log(chalk.red(`\n❌ Unknown config action: ${action}`));
  }
}
