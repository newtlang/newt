import { Macro } from "../macro.ts";


export default abstract class ASTNode {
  // TODO: write node

  public static name: string;

  protected content?: Macro;
  protected children: ASTNode[] = [];



  constructor(content?: Macro) {
    this.content = content;
  }

  public append_child(node: ASTNode) {
    this.children.push(node);

  }
}