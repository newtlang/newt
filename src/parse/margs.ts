




/**
 * Parsing macro: 
 * 
 * Input: arg1="value", arg2="value"... argn="value"
 * 
 * Format: 
 * ```ebnf
 * key = ? alpha-numeric characters  ?
 * ```
 */

import { assertEquals } from "@std/assert/equals";




export default function arg_parse(data: string): Map<string, string> {
  const result = new Map<string, string>();

  let start = 0;
  let head = 0;
  while (head < data.length) {
    // Skip whitespace
    while (head < data.length && /\s/.test(data[head])) head++;

    // Parse key (name buffer)
    start = head;
    while (head < data.length && /[a-zA-Z0-9_]/.test(data[head])) {
      head++;
    }
    const key = data.slice(start, head);

    // Skip whitespace and check for equals sign
    while (head < data.length && /\s/.test(data[head])) head++;
    if (head >= data.length || data[head] !== "=") {
      // Invalid key-value pair, skip to next
      while (head < data.length && data[head] !== ",") head++;
      if (head < data.length && data[head] === ",") head++;
      continue;
    }
    head++; // Skip equals sign

    // Skip whitespace
    while (head < data.length && /\s/.test(data[head])) head++;

    // Parse value (quotes buffer)
    if (head >= data.length || data[head] !== `"`) {
      // Invalid value, skip to next
      while (head < data.length && data[head] !== ",") head++;
      if (head < data.length && data[head] === ",") head++;
      continue;
    }
    head++; // Skip opening quote

    start = head;
    while (head < data.length) {
      if (data[head] === `"` && data[head - 1] !== `\\`) {
        break;
      }
      head++;
    }

    if (head >= data.length || data[head] !== `"`) {
      // Invalid value, skip to next
      while (head < data.length && data[head] !== ",") head++;
      if (head < data.length && data[head] === ",") head++;
      continue;
    }

    let value = data.slice(start, head);
    value = value.replace(/\\"/g, `"`) // Unescape quotes
                 .replace(/\\\\/g, `\\`); // Unescape backslashes
    head++; // Skip closing quote

    // Add to result map
    result.set(key, value);

    // Skip whitespace and comma
    while (head < data.length && /\s/.test(data[head])) head++;
    if (head < data.length && data[head] === ",") head++;
  }

  return result;
}


Deno.test("arg_parse - single key-value pair", () => {
  const input = `arg1="value1"`;
  const expected = new Map([["arg1", "value1"]]);
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - multiple key-value pairs", () => {
  const input = `arg1="value1", arg2="value2", arg3="value3"`;
  const expected = new Map([
    ["arg1", "value1"],
    ["arg2", "value2"],
    ["arg3", "value3"],
  ]);
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - handles spaces around equals sign", () => {
  const input = `arg1 = "value1", arg2= "value2", arg3 = "value3"`;
  const expected = new Map([
    ["arg1", "value1"],
    ["arg2", "value2"],
    ["arg3", "value3"],
  ]);
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - empty input", () => {
  const input = ``;
  const expected = new Map();
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - no matches", () => {
  const input = `invalid input without key-value pairs`;
  const expected = new Map();
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - handles special characters in values", () => {
  const input = `arg1="value with spaces", arg2="value_with_underscores", arg3="value-with-dashes", arg4="value with \\\"escaped\\\" quotes"`;
  const expected = new Map([
    ["arg1", "value with spaces"],
    ["arg2", "value_with_underscores"],
    ["arg3", "value-with-dashes"],
    ["arg4", "value with \"escaped\" quotes"]
  ]);
  const result = arg_parse(input);
  assertEquals(result, expected);
});

Deno.test("arg_parse - ignores invalid key-value pairs", () => {
  const input = `arg1="value1", invalidPair, arg2="value2"`;
  const expected = new Map([
    ["arg1", "value1"],
    ["arg2", "value2"],
  ]);
  const result = arg_parse(input);
  assertEquals(result, expected);
});
