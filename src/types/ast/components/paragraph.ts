import { Macro } from "../../macro.ts";
import ASTNode from "../node.ts";

class Paragraph extends Macro{
  override process(): string {
    throw new Error("Method not implemented.");
  }
};


export default abstract class AST extends ASTNode {
  // TODO: write node

  public static override name: string = "AST";
  public override content?: Paragraph; // sets header content, ready for tree walk 

  constructor(content: Paragraph) {
    super();
    this.content = content;
  }
}