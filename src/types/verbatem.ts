import { assertEquals } from "@std/assert/equals";
import { Macro } from "./macro.ts"


export default abstract class Verbatem extends Macro {
  static marker: string;


  abstract start(): string;
  abstract end(): string;

  process(): string {
    return `${this.start()}${this.raw}${this.end()}`;
  }
}

export class DefaultVerbatem extends Verbatem {
  static override name: string = "default_verbatem";
  static override marker: string = "!!!!!"

  override start(): string {
    return "<!!!!";
  }

  override end(): string {
    return "!!!!>";
  }
}

Deno.test("DefaultVerbatem class should have correct static properties", () => {
  assertEquals(DefaultVerbatem.name, "default_verbatem");
  assertEquals(DefaultVerbatem.marker, "!!!!!");
});

Deno.test("DefaultVerbatem process method should return correct string", () => {
  const defaultVerbatem = new DefaultVerbatem("","");
  defaultVerbatem.raw = "example content";
  assertEquals(defaultVerbatem.process(), "<!!!!example content!!!!>");
});

