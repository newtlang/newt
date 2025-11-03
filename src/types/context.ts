import { RWLock } from "./rw_lock.ts";
import { Macro } from "./macro.ts";
import Verbatem from "./verbatem.ts";


class CTX extends RWLock {
  private macros: Map<string, Macro>;
  private flags: Map<string, boolean>;

  constructor() {
    super();
    this.macros = new Map();
    this.flags = new Map();
  }

  addMacro(name: string, macro: Macro): void {
    this.macros.set(name, macro);
  }

  getMacro(name: string): Macro | undefined {
    return this.macros.get(name);
  }

  setFlag(flag: string, value: boolean): void {
    this.flags.set(flag, value);
  }

  getFlag(flag: string): boolean | undefined {
    return this.flags.get(flag);
  }

  markerCharacters(): Set<string> {
    const markerChars = new Set<string>();
    for (const macro of this.macros.values()) {
      if (macro instanceof Verbatem) {
        const marker = (macro.constructor as typeof Verbatem).marker;
        if (marker) {
          markerChars.add(marker);
        }

      }
    }
    return markerChars;
  }
}
