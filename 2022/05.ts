const [stacksInput, movesInput] = Deno.readTextFileSync("./05-input")
  .split("\n\n");

function parseStacks(input: string): string[][] {
  const stacks: string[][] = Array
    .from({ length: 9 })
    .map(() => []);
  const lines = input.split("\n");

  for (let i = 1; i <= 9; i++) {
    for (let j = 0; j < lines.length - 1; j++) {
      const line = lines[j];
      const char = line[4 * i - 3];
      if (char?.trim()) {
        stacks[i - 1].unshift(char);
      }
    }
  }

  return stacks;
}

function getInstruction(
  line: string,
): [move: number, from: number, to: number] {
  const [move, from, to] = line.match(/\d+/g)!.map((x) => parseInt(x, 10));
  return [move, from - 1, to - 1];
}

function partOne(data: string) {
  const stacks = parseStacks(stacksInput);

  for (const line of data.trim().split("\n")) {
    const [move, from, to] = getInstruction(line);

    for (let i = 0; i < move; i++) {
      const top = stacks[from].pop();
      if (top) stacks[to].push(top);
    }
  }

  const output = stacks.map((s) => s.at(-1)).join("");

  console.log("Part one:", output);
}

partOne(movesInput);

function partTwo(data: string) {
  const stacks = parseStacks(stacksInput);

  for (const line of data.trim().split("\n")) {
    const [move, from, to] = getInstruction(line);

    const carrying = [];
    for (let i = 0; i < move; i++) {
      const top = stacks[from].pop();
      if (top) carrying.unshift(top);
    }
    stacks[to] = stacks[to].concat(carrying);
  }

  const output = stacks.map((s) => s.at(-1)).join("");

  console.log("Part two:", output);
}

partTwo(movesInput);
