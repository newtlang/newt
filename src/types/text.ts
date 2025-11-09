import { Macro } from "./macro.ts";

type TextItem = {
  text: string,
  macro?: Macro | undefined,
}


export default class Text {

  public content: TextItem[] = []

}