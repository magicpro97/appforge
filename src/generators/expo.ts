import { exec } from 'child_process';
import { promisify } from 'util';
import type { GeneratorResult } from '../types/index.js';
import { validateProjectName } from '../core/validate.js';

const execAsync = promisify(exec);

export async function scaffoldExpo(name: string, projectPath: string): Promise<GeneratorResult> {
  validateProjectName(name);
  try {
    await execAsync(`npx create-expo-app@latest ${name} --template blank-typescript --no-install`, {
      cwd: process.cwd(),
      timeout: 120000,
    });

    return {
      success: true,
      message: `Expo project "${name}" created with TypeScript template`,
      projectPath,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create Expo project: ${error instanceof Error ? error.message : error}`,
      projectPath,
    };
  }
}
