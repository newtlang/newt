import { Macro } from "../../inline/macro.ts";
import ASTNode from "./node.ts";


export default class AST extends ASTNode {
  // TODO: write node
  
  protected override content?: Macro = undefined;

  public static override name: string = "AST";

}