import Formatting from "../formatting.ts";

export default class Underline extends Formatting {
  static override name = "underline";
  static override marker = "__";

  start(): string {
    return "<u>";
  }

  end(): string {
    return "</u>";
  }
}
