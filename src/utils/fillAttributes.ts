export default function <T extends Record<string, any>>(obj: T, v: any): T {
  return Object.fromEntries(Object.entries(obj).map(([key]) => [key, v])) as T;
}
