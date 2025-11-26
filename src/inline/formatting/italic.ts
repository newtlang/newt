import Formatting from "../../../types/formatting.ts";

export default class Italic extends Formatting {
  static override name = "italic";
  static override marker = "*";

  start(): string {
    return "<i>";
  }

  end(): string {
    return "</i>";
  }
}