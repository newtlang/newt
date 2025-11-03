import Verbatem from "../../../types/verbatem.ts";

export default class InlineCode extends Verbatem {
  static override name = "inline_code";
  static override marker = "`";

  start(): string {
    return `<code>`;
  }

  end(): string {
    return `</code>`;
  }
}
