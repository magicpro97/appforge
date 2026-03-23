import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { CICDOption, Framework, ModuleResult } from '../types/index.js';

export async function setupCICD(
  cicd: CICDOption,
  framework: Framework,
  projectPath: string
): Promise<ModuleResult> {
  const filesCreated: string[] = [];

  if (cicd === 'github-actions') {
    const workflowsDir = join(projectPath, '.github', 'workflows');
    mkdirSync(workflowsDir, { recursive: true });

    if (framework === 'flutter') {
      const ciContent = `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: stable
      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test
      - run: flutter build apk --release
`;
      writeFileSync(join(workflowsDir, 'ci.yml'), ciContent, 'utf-8');
      filesCreated.push('.github/workflows/ci.yml');
    } else {
      const ciContent = `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm test --if-present
`;
      writeFileSync(join(workflowsDir, 'ci.yml'), ciContent, 'utf-8');
      filesCreated.push('.github/workflows/ci.yml');
    }
  }

  return {
    success: true,
    message: 'CI/CD workflows generated',
    filesCreated,
    packagesInstalled: [],
  };
}
