import { assertEquals } from "@std/assert/equals";


export default function parse_formatting(data: string, markers: Set<string>): { marker: string, length: number } {
  
  if (data.length === 0 || markers.size === 0) {
    return { marker: "", length: 0 };
  }

  // create a set of possible marker characters
  // const marker_characters = new Set([...markers].flatMap(marker => marker.split("")));

  // determine the length of the buffer
  const bufferLength = Math.max(...[...markers].map(marker => marker.length));

  // slice the buffer from the data
  const buffer = data.slice(0, bufferLength);

  // create a list of markers, sorted in descending lenght
  const candidates = [...markers]
    .filter(marker => marker.length <= buffer.length)
    .sort((a, b) => b.length - a.length);

  // greedily return the best match
  for (const candidate of candidates) {
    if (buffer.startsWith(candidate)) {
      return { marker: candidate, length: candidate.length };
    }
  }

  // return blank if one cant be found
  return { marker: "", length: 0 };
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

Deno.test("parse_formatting - jumbled markers", () => {
  const data = "**!**";
  const markers = new Set(["**", "*!"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "**", length: 2 };
  assertEquals(result, expected);
});

Deno.test("parse_formatting - double markers", () => {
  const data = "**--!";
  const markers = new Set(["**", "--!"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "**", length: 2 };
  assertEquals(result, expected);
});

Deno.test("parse_formatting - invalid markers", () => {
  const data = "*-!";
  const markers = new Set(["**", "--!"]);
  const result = parse_formatting(data, markers);
  const expected = { marker: "", length: 0 };
  assertEquals(result, expected);
});