

import { assertEquals } from "@std/assert/equals";


class Context {}

export default function parse_heading(data: string, ctx: Context): { marker: string, length: number } {
  
  // get first word and check if it starts with # and contains # ? ! > <
  const firstWord = data.split(/\s+/)[0];
  
  if (!(firstWord.startsWith("#") && /[#?!><]/.test(firstWord))) {
    return { marker: "", length: 0 };
  }

  let base_level = 0; // number of #
  let inc = 0;        // number of > 
  let dec = 0;        // number of <
  let tracked = true; // set to false if contains !
  let hidden = false; // set to true if contains ?

  for (const char of firstWord) {
    switch (char) {
      case "#":
        base_level++;
        break;
      case ">":
        inc++;
        break;
      case "<":
        dec++;
        break;
      case "!":
        tracked = false;
        break;
      case "?":
        hidden = true;
        break;
    }
  }

  data = data.slice(firstWord.length).trimStart();

  const lastWordMatch = data.match(/\{\s*\w[a-zA-Z0-9-_]+\w\s*\}$/);
  let customId = "";
  if (lastWordMatch) {
    customId = lastWordMatch[0].replace(/[\{\}\s]/g, "");
  }

  return { marker: firstWord, length: firstWord.length };

  // return blank if one cant be found
}

function parse_first_word(data: string): {
  base_level: number,
  inc: number,
  dec: number,
  tracked: boolean,
  hidden: boolean,
  firstWord: string
} {
  const firstWord = data.split(/\s+/)[0];

  let base_level = 0; // number of #
  let inc = 0;        // number of > 
  let dec = 0;        // number of <
  let tracked = true; // set to false if contains !
  let hidden = false; // set to true if contains ?

  for (const char of firstWord) {
    switch (char) {
      case "#":
        base_level++;
        break;
      case ">":
        inc++;
        break;
      case "<":
        dec++;
        break;
      case "!":
        tracked = false;
        break;
      case "?":
        hidden = true;
        break;
    }
  }

  return { base_level, inc, dec, tracked, hidden, firstWord };
}


Deno.test("parse_formatting - extracting a formatting marker", () => {

});

