const textInput = Deno.readTextFileSync("./04-input").trim().split("\n");

function partOne(data: string[]) {
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const [a, b] = data[i].split(",");
    const [a1, a2] = a.split("-").map((v) => parseInt(v, 10));
    const [b1, b2] = b.split("-").map((v) => parseInt(v, 10));
    if (
      // a is within b
      (a1 <= b1 && a2 >= b2) ||
      // b is within a
      (a1 >= b1 && a2 <= b2)
    ) {
      count++;
    }
  }

  console.log("Part one:", count);
}

partOne(textInput);

function partTwo(data: string[]) {
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const [a, b] = data[i].split(",");
    const [a1, a2] = a.split("-").map((v) => parseInt(v, 10));
    const [b1, b2] = b.split("-").map((v) => parseInt(v, 10));
    if (
      // a1 is within b
      (a1 >= b1 && a1 <= b2) ||
      // a2 is within b
      (a2 >= b1 && a2 <= b2) ||
      // a is within b
      (a1 <= b1 && a2 >= b2) ||
      // b is within a
      (a1 >= b1 && a2 <= b2)
    ) {
      count++;
    }
  }

  console.log("Part two:", count);
}

partTwo(textInput);
