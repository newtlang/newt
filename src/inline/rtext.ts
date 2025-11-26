import { Macro } from "./macro.ts";


export default class RText {

  protected content: Macro[] = [];

  

  append() {}


  toString(): string {
    return this.content.map(format => format.toString()).join("");
  }
}