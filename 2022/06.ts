const textInput = Deno.readTextFileSync("./06-input").trim().split("");

function taskOne(data: string[], chunkLen = 4): number {
  for (let i = 0; i < data.length; i++) {
    const chunk = new Set(data.slice(i, i + chunkLen));
    if (chunk.size === chunkLen) {
      return i + chunkLen;
    }
  }
  return -1;
}

console.log("Part one:", taskOne(textInput));
console.log("Part two:", taskOne(textInput, 14));
