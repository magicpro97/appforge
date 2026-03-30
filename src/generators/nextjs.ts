import { exec } from 'child_process';
import { promisify } from 'util';
import type { GeneratorResult } from '../types/index.js';
import { validateProjectName } from '../core/validate.js';

const execAsync = promisify(exec);

export async function scaffoldNextjs(name: string, projectPath: string): Promise<GeneratorResult> {
  validateProjectName(name);
  try {
    await execAsync(
      `npx create-next-app@latest ${name} --typescript --eslint --tailwind --app --src-dir --no-import-alias --no-install`,
      {
        cwd: process.cwd(),
        timeout: 120000,
      }
    );

    return {
      success: true,
      message: `Next.js project "${name}" created with TypeScript & App Router`,
      projectPath,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create Next.js project: ${error instanceof Error ? error.message : error}`,
      projectPath,
    };
  }
}
