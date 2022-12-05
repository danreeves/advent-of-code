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

function partOne(data: string) {
  const stacks = parseStacks(stacksInput);
  for (const line of data.trim().split("\n")) {
    const matches = line.match(/\d+/g);
    if (!matches) throw new Error("line parse error");
    const [move, from, to] = matches.map((x) => parseInt(x, 10));

    for (let i = 0; i < move; i++) {
      const top = stacks[from - 1].pop();
      if (top) stacks[to - 1].push(top);
    }
  }

  const output = stacks.reduce((str, stack) => {
    str += stack.at(-1);
    return str;
  }, "");

  console.log("Part one:", output);
}

partOne(movesInput);

function partTwo(data: string) {
  const stacks = parseStacks(stacksInput);
  for (const line of data.trim().split("\n")) {
    const matches = line.match(/\d+/g);
    if (!matches) throw new Error("line parse error");
    const [move, from, to] = matches.map((x) => parseInt(x, 10));

    const carrying = [];
    for (let i = 0; i < move; i++) {
      const top = stacks[from - 1].pop();
      if (top) carrying.unshift(top);
    }
    stacks[to - 1] = stacks[to - 1].concat(carrying);
  }

  const output = stacks.reduce((str, stack) => {
    str += stack.at(-1);
    return str;
  }, "");

  console.log("Part two:", output);
}

partTwo(movesInput);
