
import { Macro } from "../../../inline/macro.ts";
import ASTNode from "../node.ts";

class Header extends Macro{
  override process(): string {
    throw new Error("Method not implemented.");
  }
};


export default abstract class AST extends ASTNode {
  // TODO: write node

  public static override name: string = "AST";
  public override content?: Header; // sets header content, ready for tree walk 

  constructor(content: Header) {
    super();
    this.content = content;
  }
}