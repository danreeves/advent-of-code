const textInput = Deno.readTextFileSync("./03-input").trim();
import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

function charToPriority(char: string): number {
  if (char > "Z") {
    return char.charCodeAt(0) - 96;
  }
  return char.charCodeAt(0) - 38;
}

assert(charToPriority("a") === 1);
assert(charToPriority("b") === 2);
assert(charToPriority("z") === 26);
assert(charToPriority("A") === 27);
assert(charToPriority("B") === 28);
assert(charToPriority("Z") === 52);

function partOne(data: string) {
  const sumPriorities = data
    .split("\n")
    .reduce((sum, line) => {
      const inA = new Set();
      const counted = new Set();

      for (let i = 0; i < line.length; i++) {
        if (i < line.length / 2) {
          inA.add(line[i]);
        } else {
          if (inA.has(line[i]) && !counted.has(line[i])) {
            sum += charToPriority(line[i]);
            counted.add(line[i]);
          }
        }
      }

      return sum;
    }, 0);

  console.log("Part one:", sumPriorities);
}

partOne(textInput);

function partTwo(data: string) {
  const lines = data.split("\n");
  let sum = 0;

  for (let i = 0; i < lines.length; i += 3) {
    const group = [
      new Set(lines[i]),
      new Set(lines[i + 1]),
      new Set(lines[i + 2]),
    ];

    const uniqueChars = new Set(group.flatMap((x) => [...x]));

    for (const char of uniqueChars) {
      const count = group.reduce((sum, line) => {
        sum += line.has(char) ? 1 : 0;
        return sum;
      }, 0);

      if (count === 3) {
        sum += charToPriority(char);
      }
    }
  }

  console.log("Part two:", sum);
}

partTwo(textInput);
