export interface CookieInterface {
  get: (name: string) => string | null;
  set: (name: string, value: string, options: { expires: number }) => void;
  remove: (name: string) => void;
}
