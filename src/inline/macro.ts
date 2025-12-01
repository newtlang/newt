import { assertEquals } from "@std/assert/equals";

export type tMacro = {
  name: string;
  args: string;
  input: string;
};

export abstract class Macro {
  static name: string;

  args: Map<string, string>;
  input: string;

  constructor(args: string, input: string) {
    this.args = new Map(); // TODO: parse args to map
    this.input = input ?? ""
  }

  abstract process(): string;
}

export class DefaultMacro extends Macro {
  static override name: string = "default_macro";

  process(): string {
    return "this is a default macro"
  }
}

Deno.test("DefaultMacro class should have correct static properties", () => {
  assertEquals(DefaultMacro.name, "default_macro");
});

Deno.test("DefaultMacro process method should return correct string", () => {
  const defaultMacro = new DefaultMacro("", "");
  assertEquals(defaultMacro.process(), "this is a default macro");
});
