import { exec } from 'child_process';
import { promisify } from 'util';
import type { GeneratorResult } from '../types/index.js';
import { validateProjectName } from '../core/validate.js';

const execAsync = promisify(exec);

export async function scaffoldAstro(name: string, projectPath: string): Promise<GeneratorResult> {
  validateProjectName(name);
  try {
    await execAsync(`npm create astro@latest ${name} -- --template basics --no-install --no-git`, {
      cwd: process.cwd(),
      timeout: 120000,
    });

    return {
      success: true,
      message: `Astro project "${name}" created`,
      projectPath,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create Astro project: ${error instanceof Error ? error.message : error}`,
      projectPath,
    };
  }
}
