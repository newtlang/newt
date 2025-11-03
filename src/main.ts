
abstract class Macro {
  static name: string;

  args: Map<string, string>;
  raw: string;

  constructor(args: string, raw: string) {
    this.args = new Map(); // TODO: parse args to map
    this.raw = raw
  }

  abstract process(): string;
}

interface iMarker {
  marker: string
}

abstract class Verbatem extends Macro {
  static marker: string;
}

abstract class Marker extends Verbatem {
  
  override process(): string {
    switch (this.raw) {
      case "start":
      return this.start();
      case "end":
      return this.end();
      default:
      throw new Error("AAA");
    }
  }

  abstract start(): string;
  abstract end(): string;

}




class Bold extends Marker {
  static override marker = "**";
  static override name = "bold";

  start(): string {
    return "<b>";
  }

  end(): string {
    return "</b>";
  }
}

class Italic extends Marker {
  static override name = "italic";
  static override marker = "*";

  start(): string {
    return "<i>";
  }

  end(): string {
    return "</i>";
  }
}

class Underline extends Marker {
  static override name = "underline";
  static override marker = "__";

  start(): string {
    return "<u>";
  }

  end(): string {
    return "</u>";
  }
}

class InlineCode extends Verbatem {
  static override name = "inlineCode";
  static override marker = "`";

  process(): string {
    return `<code>${this.raw}</code>`;
  }
}

class Emoji extends Macro {
  static override name = "emoji";

  // TODO: move this to a func that uses codes n shit
  static emojiMap: { [key: string]: string } = {
    ":smile:": "😄",
    ":heart:": "❤️",
    ":thumbsup:": "👍",
  };

  process(): string {
    return Emoji.emojiMap[this.raw] || this.raw;
  }
}



class CTX {
  // TODO: need a list of macros
  // TODO: need a list of flags that are active (pass ctx into )
  // TODO: list of marker characters and set
}



// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // TODO: a lot of things

}


type ParseReturn = {
  content: string;
  macro?: Macro;
};

export async function parse(
  data: string, 
  markers: Set<string>, 
  flags?: Set<string>, 
  macros: boolean = true,
): Promise<ParseReturn> {

  const marker_characters = new Set([...markers].join(''));

  let out: ParseReturn = { content: "" }

  console.log(marker_characters)


  for (let i: number = 0; i < data.length; i++) {
    let c = data[i];

    if (c === '\\') {
      console.log("Escape character found: \\");
      
      if (i + 1 < data.length && marker_characters.has(data[i + 1])) {
        console.log(`Next character is a marker character: ${data[i + 1]}`);
        data = data.slice(0, i) + data.slice(i + 1);
        i++; // Skip the next character
      }

      else if (macros) {

        let j: number = i+1;

        for (j; j < data.length; j++) {
          console.log(data[j])
          if ([' ', '(', '[', '{'].includes(data[j])) {
            break;
          }
        }

        const name = data.slice(i+1, j); 
        console.log(name);

        // TODO: check if name is a macro

        let variant: ParseReturn;
        let args: ParseReturn;
        let raw: ParseReturn;

        if (data[j] === "[") {
          console.log("Variant Detected")
          variant = await parse(data.slice(++j), new Set(["]"]), flags, false);
          j += variant.content.length;
        }

        if (data[j] === "(") {
          console.log("Args Detected")
          args = await parse(data.slice(++j), new Set([")"]), flags, false);
          j += args.content.length;
        }

        if (data[j] === "{") {
          console.log("Raw Input Detected")
          raw = await parse(data.slice(++j), new Set([")"]), flags, false);
          j += raw.content.length;
        }



        i = j; // Move i to the end of the processed segment
      }
    }
    else if (marker_characters.has(c)) {
      console.log(`Marker character found: ${c}`);

      // TODO: do the marker character thing

      if (macros) {
        // TODO: match the marker to the marker macro
        out.macro = new DummyMacro();
      }
    }

  }

  console.log(data)

  return out;
}