import { assertEquals } from "@std/assert/equals";


export default function parse_formatting(data: string, markers: Set<string>): { marker: string, length: number } {
  const marker_characters = new Set([...markers].flatMap(marker => marker.split("")));

  console.log(marker_characters)

  let buffer = "";

  for (const char of data) {
    console.log(marker_characters.has(char))
    console.log(buffer)
    if (marker_characters.has(char)) {
      const potentialBuffer = buffer + char;
      if (markers.has(potentialBuffer)) {
        return { marker: potentialBuffer, length: potentialBuffer.length };
      } else {
        buffer = potentialBuffer;
      }
    } else {
      return { marker: buffer, length: buffer.length };
    }
  }

  return { marker: buffer, length: buffer.length };
}

Deno.test("parse_formatting - extracting a formatting marker", () => {
  const data = "** test";
  const markers = new Set(["**"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "**", length: 2 };
  assertEquals(result, expected);
});

Deno.test("parse_formatting - handling a non-marker", () => {
  const data = "test";
  const markers = new Set(["**"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "", length: 0 };
  assertEquals(result, expected);
});

Deno.test("parse_formatting - handling weird markers", () => {
  const data = "**!";
  const markers = new Set(["**", "**!"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "**!", length: 3 };
  assertEquals(result, expected);
});