// Converting all characters to lowercase & Removing any non-alphanumeric characters including spaces.
export function normalizeString(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "");
}
