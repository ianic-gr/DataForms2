export default function <T extends Record<string, any>>(obj: T, defaultText: string = "-"): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" || value === null || value === undefined ? defaultText : value,
    ])
  ) as T;
}
