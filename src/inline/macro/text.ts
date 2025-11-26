import { Macro } from "../macro.ts";

export default class Emoji extends Macro {
  static override name = "emoji";

  process(): string {
    return this.input;
  }
}
