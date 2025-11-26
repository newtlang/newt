/**
 * Parsing macro: 
 * 
 * Input: 
 * - name 
 * - name(args) 
 * - name{input} 
 * - name(args){input} 
 * 
 * ```ebnf
 * macro = "\", name, ["(", args, ")"], ["{", input, "}"]
 */

import { assertEquals } from "@std/assert/equals";
import { tMacro } from "../../inline/macro.ts";

// function walkUntil(data: string, start: number, stopChars: Set<string>): number {
//   let head = start;
//   while (head < data.length && !stopChars.has(data[head])) {
//     head++;
//   }
//   return head;
// }

// function extractEnclosed(data: string, start: number, openChar: string, closeChar: string): { value: string, end: number } {
//   if (data[start] !== openChar) {
//     return { value: "", end: start };
//   }
//   start++;
//   const end = walkUntil(data, start, new Set([closeChar]));
//   const value = data.slice(start, end);
//   return { value, end: end < data.length && data[end] === closeChar ? end + 1 : end };
// }

export default function parse_macro(data: string): { macro: tMacro, length: number } {
  // define start and head indexes
  let start = 0;
  let head = 0;

  // define values
  let name = "";
  let args = "";
  let input = "";

  // if \ is still present, shift start by 1
  if (data.startsWith("\\")) {
    start++;
    head++;
  }

  // loop through to get the name
  const nameBreaks = new Set([" ", "\\", "(", "{"]);
  
  head = start;
  while (head < data.length && !nameBreaks.has(data[head])) {
    head++;
  }

  name = data.slice(start, head);

  // extract arguments
  if (head < data.length && data[head] === "(") {
    head++;
    const argsStart = head;
    let quoteChar: string | null = null;
    while (head < data.length) {
      if ((data[head] === '"' || data[head] === "'") && (quoteChar === null || quoteChar === data[head])) {
        quoteChar = quoteChar === null ? data[head] : null;
      } else if (data[head] === ")" && quoteChar === null) {
        break;
      }
      head++;
    }
    args = data.slice(argsStart, head);
    if (head < data.length && data[head] === ")") {
      head++;
    }
  }

  // extract input
  if (head < data.length && data[head] === "{") {
    head++;
    const inputStart = head;
    while (head < data.length) {
      if (data[head] === "}" && (head === 0 || data[head - 1] !== "\\")) {
        break;
      }
      head++;
    }
    input = data.slice(inputStart, head).replace(/\\}/g, "}");
    if (head < data.length && data[head] === "}") {
      head++;
    }
  }

  // build output, and return
  const macro: tMacro = { name, args, input };
  return { macro, length: head };
}

Deno.test("parse_macro - basic macro name", () => {
  const data = "\\macroName";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "");
  assertEquals(result.macro.input, "");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - macro with arguments", () => {
  const data = "\\macroName(arg1, arg2)";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "arg1, arg2");
  assertEquals(result.macro.input, "");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - macro with input", () => {
  const data = "\\macroName{inputData}";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "");
  assertEquals(result.macro.input, "inputData");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - macro with arguments and input", () => {
  const data = "\\macroName(arg1, arg2){inputData}";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "arg1, arg2");
  assertEquals(result.macro.input, "inputData");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - implicit closing for arguments", () => {
  const data = "\\macroName(arg1, arg2";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "arg1, arg2");
  assertEquals(result.macro.input, "");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - implicit closing for input", () => {
  const data = "\\macroName{inputData";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "");
  assertEquals(result.macro.input, "inputData");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - implicit closing for arguments and input", () => {
  const data = "\\macroName(arg1, arg2{inputData";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "arg1, arg2{inputData");
  assertEquals(result.macro.input, "");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - testing close bracket in arg quotes", () => {
  const data = "\\macroName(arg1 = \"}\")";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "arg1 = \"}\"");
  assertEquals(result.macro.input, "");
  assertEquals(result.length, data.length);
});

Deno.test("parse_macro - testing escaped close brace in input", () => {
  const data = "\\macroName{\\}}";
  const result = parse_macro(data);
  assertEquals(result.macro.name, "macroName");
  assertEquals(result.macro.args, "");
  assertEquals(result.macro.input, "}");
  assertEquals(result.length, data.length);
});
