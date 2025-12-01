import Formatting from "../formatting.ts";


export default class Bold extends Formatting {
  static override marker = "**";
  static override name = "bold";

  start(): string {
    return "<b>";
  }

  end(): string {
    return "</b>";
  }
}
