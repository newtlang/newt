
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