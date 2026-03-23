import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import type { AppForgeConfig } from '../types/index.js';

const CONFIG_DIR = join(homedir(), '.appforge');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

export function ensureConfigDir(): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

export function loadConfig(): AppForgeConfig {
  ensureConfigDir();
  if (!existsSync(CONFIG_FILE)) {
    return {};
  }
  try {
    const raw = readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(raw) as AppForgeConfig;
  } catch {
    return {};
  }
}

export function saveConfig(config: AppForgeConfig): void {
  ensureConfigDir();
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export function getConfigValue(key: string): string | undefined {
  const config = loadConfig();
  const mapped: Record<string, unknown> = {
    framework: config.defaultFramework,
    backend: config.defaultBackend,
    auth: config.defaultAuth,
    styling: config.defaultStyling,
    stateManagement: config.defaultStateManagement,
    cicd: config.defaultCicd,
    copilotAgents: config.defaultCopilotAgents,
  };
  const val = mapped[key];
  return val !== undefined ? String(val) : undefined;
}

export function setConfigValue(key: string, value: string): void {
  const config = loadConfig();
  const keyMap: Record<string, keyof AppForgeConfig> = {
    framework: 'defaultFramework',
    backend: 'defaultBackend',
    styling: 'defaultStyling',
    stateManagement: 'defaultStateManagement',
    cicd: 'defaultCicd',
    copilotAgents: 'defaultCopilotAgents',
  };

  const configKey = keyMap[key];
  if (configKey) {
    if (configKey === 'defaultCopilotAgents') {
      (config as Record<string, unknown>)[configKey] = value === 'true';
    } else {
      (config as Record<string, unknown>)[configKey] = value;
    }
    saveConfig(config);
  }
}
