#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './cli/commands/init.js';
import { addCommand } from './cli/commands/add.js';
import { templateCommand } from './cli/commands/template.js';
import { configCommand } from './cli/commands/config.js';

const program = new Command();

program
  .name('appforge')
  .description(chalk.bold('🏗️  AppForge — Universal App Scaffolding CLI'))
  .version('1.0.0', '-v, --version', 'Display version number');

program
  .command('init [name]')
  .description('Interactive wizard to create a new project')
  .action(initCommand);

program
  .command('add <module>')
  .description('Add feature module to existing project (auth, analytics, push, payments)')
  .action(addCommand);

const template = program
  .command('template')
  .description('Manage project templates');

template
  .command('list')
  .description('List available project templates')
  .action(() => templateCommand('list'));

template
  .command('save <name>')
  .description('Save current project config as reusable template')
  .action((name: string) => templateCommand('save', name));

const config = program
  .command('config')
  .description('Configure defaults');

config
  .command('set <key> <value>')
  .description('Set a configuration value')
  .action((key: string, value: string) => configCommand('set', key, value));

config
  .command('list')
  .description('Show current configuration')
  .action(() => configCommand('list'));

program.parse();
