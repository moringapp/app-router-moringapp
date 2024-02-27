import Cookies from "js-cookie";
import { CookieInterface } from "./interface";

class Cookie implements CookieInterface {
  constructor(private cookies: typeof Cookies) {}

  get(name: string) {
    return this.cookies.get(name) || null;
  }

  set(name: string, value: string, options: { expires: number }) {
    this.cookies.set(name, value, { expires: options.expires });
  }

  remove(name: string) {
    this.cookies.remove(name);
  }
}

export default Cookie;