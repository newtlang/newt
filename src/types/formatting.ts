
import { assertEquals } from "@std/assert/equals";
import Verbatem from "./verbatem.ts";



export default abstract class Formatting extends Verbatem {

  override process(): string {
    switch (this.raw) {
      case "start":
      return this.start();
      case "end":
      return this.end();
      default:
      throw new Error("AAA");
    }
  }

  abstract override start(): string;
  abstract override end(): string;

}

export class DefaultFormatting extends Formatting {
  static override name: string = "default_formatting";
  static override marker: string = "?????"

  override start(): string {
    return "<????"
  }

  override end(): string {
    return "????>"
  }
}

Deno.test("DefaultFormatting class should have correct static properties", () => {
  assertEquals(DefaultFormatting.marker, "?????");
  assertEquals(DefaultFormatting.name, "default_formatting");
});

Deno.test("DefaultFormatting class start method should return correct marker", () => {
  const defaultFormatting = new DefaultFormatting("", "start");
  assertEquals(defaultFormatting.process(), "<????");
});

Deno.test("DefaultFormatting class end method should return correct marker", () => {
  const defaultFormatting = new DefaultFormatting("", "end");
  assertEquals(defaultFormatting.process(), "????>");
});