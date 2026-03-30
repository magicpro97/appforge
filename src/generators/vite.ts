import { exec } from 'child_process';
import { promisify } from 'util';
import type { Framework, GeneratorResult } from '../types/index.js';
import { validateProjectName } from '../core/validate.js';

const execAsync = promisify(exec);

const viteTemplateMap: Record<string, string> = {
  'vite-react': 'react-ts',
  'vite-vue': 'vue-ts',
  'vite-svelte': 'svelte-ts',
};

export async function scaffoldVite(
  name: string,
  projectPath: string,
  framework: Framework
): Promise<GeneratorResult> {
  validateProjectName(name);
  const template = viteTemplateMap[framework];
  if (!template) {
    return {
      success: false,
      message: `Unknown Vite template for framework: ${framework}`,
      projectPath,
    };
  }

  try {
    await execAsync(`npm create vite@latest ${name} -- --template ${template}`, {
      cwd: process.cwd(),
      timeout: 120000,
    });

    return {
      success: true,
      message: `Vite project "${name}" created with ${template} template`,
      projectPath,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create Vite project: ${error instanceof Error ? error.message : error}`,
      projectPath,
    };
  }
}
