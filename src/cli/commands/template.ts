import chalk from 'chalk';
import { listAllTemplates, saveUserTemplate } from '../../core/templates.js';
import type { TemplateConfig } from '../../types/index.js';

export async function templateCommand(action: string, name?: string): Promise<void> {
  switch (action) {
    case 'list': {
      const templates = listAllTemplates();

      if (templates.length === 0) {
        console.log(chalk.yellow('\n📋 No templates found'));
        console.log(chalk.gray('  Built-in templates will be available in the templates/ directory'));
        console.log(chalk.gray('  Save custom templates with: appforge template save <name>'));
        return;
      }

      console.log(chalk.bold.cyan('\n📋 Available Templates\n'));
      console.log(chalk.gray('─'.repeat(50)));

      for (const tpl of templates) {
        console.log(chalk.bold.white(`  ${tpl.name}`));
        console.log(chalk.gray(`  ${tpl.description}`));
        if (tpl.config.framework) {
          console.log(chalk.gray(`  Framework: ${tpl.config.framework}`));
        }
        if (tpl.config.backend) {
          console.log(chalk.gray(`  Backend: ${tpl.config.backend}`));
        }
        console.log();
      }
      break;
    }

    case 'save': {
      if (!name) {
        console.log(chalk.red('\n❌ Template name is required'));
        console.log(chalk.gray('  Usage: appforge template save <name>'));
        return;
      }

      const template: TemplateConfig = {
        name,
        description: `Custom template: ${name}`,
        config: {},
      };

      saveUserTemplate(name, template);
      console.log(chalk.green(`\n✅ Template "${name}" saved`));
      console.log(chalk.gray('  Use it with: appforge init --template ' + name));
      break;
    }

    default:
      console.log(chalk.red(`\n❌ Unknown template action: ${action}`));
  }
}
