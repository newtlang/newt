

export function parse_header(data: string): {
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
