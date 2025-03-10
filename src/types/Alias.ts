export type AliasLanguages = "en" | "el" | "de" | "ro";

export interface Alias {
  alias: Record<AliasLanguages, string>;
}
