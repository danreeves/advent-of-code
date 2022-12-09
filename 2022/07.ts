const textInput = Deno.readTextFileSync("./07-input").trim().split("\n");

function getDirSizes(data: string[]) {
  const currentDirectory = [];
  const dirs: Record<string, number> = {};

  for (const line of data) {
    if (line.startsWith("$")) {
      const [, cmd, arg] = line.split(" ");
      if (cmd === "cd") {
        if (arg === "..") {
          currentDirectory.pop();
        } else {
          currentDirectory.push(arg);
        }
      }
    } else if (line.startsWith("dir")) {
      // don't care about these
    } else {
      const [fileSize] = line.split(" ").map((str) => parseInt(str, 10));
      const p = [...currentDirectory];
      while (p.length) {
        const path = p.join("/").replace("//", "/");
        dirs[path] = dirs[path] ?? 0;
        dirs[path] += fileSize;
        p.pop();
      }
    }
  }
  return dirs;
}

const sizes = getDirSizes(textInput);

const sum = Object.values(sizes).reduce((total, size) => {
  if (size <= 100000) {
    total += size;
  }

  return total;
}, 0);

console.log("Part one:", sum);

const FS_MAX_SIZE = 70000000;
const SPACE_NEEDED = 30000000;

const currentSpace = FS_MAX_SIZE - sizes["/"];
const needToDelete = SPACE_NEEDED - currentSpace;

const dirToDelete =
  Object.entries(sizes).filter(([, size]) => size >= needToDelete).sort((
    [, a],
    [, b],
  ) => a - b)[0];

console.log("Part two:", dirToDelete);
