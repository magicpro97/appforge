import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { ProjectConfig } from '../types/index.js';

export function generateLandingPage(config: ProjectConfig, projectPath: string): void {
  const landingDir = join(projectPath, 'landing', 'public');
  mkdirSync(landingDir, { recursive: true });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.name} — Built with AppForge</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e0e0e0; }
    .container { max-width: 800px; margin: 0 auto; padding: 4rem 2rem; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { font-size: 1.2rem; color: #888; margin-bottom: 2rem; }
    .badge { display: inline-block; background: #1a1a2e; border: 1px solid #333; border-radius: 8px; padding: 0.5rem 1rem; margin: 0.5rem; font-size: 0.9rem; }
    .cta { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${config.name}</h1>
    <p>Built with AppForge — Universal App Scaffolding CLI</p>
    <div>
      <span class="badge">🚀 ${config.framework}</span>
      ${config.backend !== 'none' ? `<span class="badge">☁️ ${config.backend}</span>` : ''}
      ${config.styling !== 'none' ? `<span class="badge">🎨 ${config.styling}</span>` : ''}
    </div>
    <br />
    <a href="https://github.com/magicpro97/appforge" class="cta">Get Started →</a>
  </div>
</body>
</html>`;

  writeFileSync(join(landingDir, 'index.html'), html, 'utf-8');
}
