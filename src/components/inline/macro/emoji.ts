import { Macro } from "../../../types/macro.ts";

export default class Emoji extends Macro {
  static override name = "emoji";

  // TODO: move this to a func that uses codes n shit
  static emojiMap: { [key: string]: string } = {
    ":smile:": "😄",
    ":heart:": "❤️",
    ":thumbsup:": "👍",
  };

  process(): string {
    return Emoji.emojiMap[this.raw] || this.raw;
  }
}
