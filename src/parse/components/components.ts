

import { assertEquals } from "@std/assert/equals";


class Context {}

export default function parse_components(data: string, ctx: Context): { marker: string, length: number } {
  
  // split text up into lines and for i loop through them

  let buffer = "";

  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];



  }

  // return blank if one cant be found
  return { marker: "", length: 0 };
}

Deno.test("parse_formatting - extracting a formatting marker", () => {

});

