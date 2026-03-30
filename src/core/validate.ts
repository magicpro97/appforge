export function validateProjectName(name: string): void {
  if (!name || !name.trim()) {
    throw new Error('Project name is required');
  }
  if (/[^a-zA-Z0-9\-_.]/.test(name)) {
    throw new Error('Project name can only contain letters, numbers, hyphens, underscores, and dots');
  }
}
