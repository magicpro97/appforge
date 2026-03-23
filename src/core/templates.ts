import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { TemplateConfig } from '../types/index.js';
import { loadConfig, saveConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getTemplatesDir(): string {
  // Navigate from dist/core/ to project root templates/
  return join(__dirname, '..', '..', 'templates');
}

export function listBuiltInTemplates(): TemplateConfig[] {
  const templatesDir = getTemplatesDir();
  const templates: TemplateConfig[] = [];

  if (!existsSync(templatesDir)) {
    return templates;
  }

  const files = readdirSync(templatesDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    try {
      const raw = readFileSync(join(templatesDir, file), 'utf-8');
      const tpl = JSON.parse(raw) as TemplateConfig;
      templates.push(tpl);
    } catch {
      // Skip invalid templates
    }
  }

  return templates;
}

export function listUserTemplates(): TemplateConfig[] {
  const config = loadConfig();
  if (!config.templates) return [];
  return Object.values(config.templates);
}

export function listAllTemplates(): TemplateConfig[] {
  return [...listBuiltInTemplates(), ...listUserTemplates()];
}

export function saveUserTemplate(name: string, template: TemplateConfig): void {
  const config = loadConfig();
  if (!config.templates) {
    config.templates = {};
  }
  config.templates[name] = template;
  saveConfig(config);
}

export function getTemplate(name: string): TemplateConfig | undefined {
  const all = listAllTemplates();
  return all.find(t => t.name === name);
}
