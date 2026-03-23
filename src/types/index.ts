export interface ProjectConfig {
  name: string;
  framework: Framework;
  backend: Backend;
  auth: AuthMethod[];
  styling: StylingOption;
  stateManagement: StateManagement;
  cicd: CICDOption;
  copilotAgents: boolean;
  generateReadme: boolean;
  generateLandingPage: boolean;
}

export type Framework = 'expo' | 'flutter' | 'nextjs' | 'vite-react' | 'vite-vue' | 'vite-svelte' | 'astro';

export type Backend = 'supabase' | 'firebase' | 'pocketbase' | 'appwrite' | 'none';

export type AuthMethod = 'email' | 'social' | 'magic-link' | 'none';

export type StylingOption = 'tailwind' | 'nativewind' | 'styled-components' | 'css-modules' | 'none';

export type StateManagement = 'zustand' | 'redux' | 'riverpod' | 'provider' | 'none';

export type CICDOption = 'github-actions' | 'none';

export interface TemplateConfig {
  name: string;
  description: string;
  config: Partial<ProjectConfig>;
}

export interface AppForgeConfig {
  defaultFramework?: Framework;
  defaultBackend?: Backend;
  defaultAuth?: AuthMethod[];
  defaultStyling?: StylingOption;
  defaultStateManagement?: StateManagement;
  defaultCicd?: CICDOption;
  defaultCopilotAgents?: boolean;
  templates?: Record<string, TemplateConfig>;
}

export interface GeneratorResult {
  success: boolean;
  message: string;
  projectPath: string;
}

export interface ModuleResult {
  success: boolean;
  message: string;
  filesCreated: string[];
  packagesInstalled: string[];
}
