const rows = Deno.readTextFileSync("./08-input").trim().split("\n").map(
  (line) => line.split("").map((num) => parseInt(num, 10)),
);

let totalVisible = 0;

totalVisible += rows[0].length * 2;
totalVisible += (rows.length * 2) - 4; // 4 corners already counted

for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[i].length - 1; j++) {
    const row = rows[i];
    const treeHeight = row[j];
    let blockedBy = 0;

    // To the left
    for (let x = 0; x < j; x++) {
      if (row[x] >= treeHeight) {
        blockedBy++;
        break;
      }
    }
    // To the right
    for (let x = row.length - 1; x > j; x--) {
      if (row[x] >= treeHeight) {
        blockedBy++;
        break;
      }
    }
    // Above
    for (let y = 0; y < i; y++) {
      if (rows[y][j] >= treeHeight) {
        blockedBy++;
        break;
      }
    }
    // Below
    for (let y = rows.length - 1; y > i; y--) {
      if (rows[y][j] >= treeHeight) {
        blockedBy++;
        break;
      }
    }

    if (blockedBy < 4) {
      totalVisible++;
    }
  }
}

console.log("Part one:", totalVisible);

const scenicScores = [];
for (let i = 1; i < rows.length - 1; i++) {
  for (let j = 1; j < rows[i].length - 1; j++) {
    const row = rows[i];
    const treeHeight = row[j];

    // To the left
    let canSeeLeft = 0;
    for (let x = j - 1; x >= 0; x--) {
      canSeeLeft++;
      if (row[x] >= treeHeight) {
        break;
      }
    }
    // To the right
    let canSeeRight = 0;
    for (let x = j + 1; x <= row.length; x++) {
      canSeeRight++;
      if (row[x] >= treeHeight) {
        break;
      }
    }
    // Above
    let canSeeUp = 0;
    for (let y = i - 1; y >= 0; y--) {
      canSeeUp++;
      if (rows[y][j] >= treeHeight) {
        break;
      }
    }
    // Below
    let canSeeDown = 0;
    for (let y = i + 1; y < rows.length; y++) {
      canSeeDown++;
      if (rows[y][j] >= treeHeight) {
        break;
      }
    }

    scenicScores.push(canSeeLeft * canSeeRight * canSeeUp * canSeeDown);
  }
}

console.log("Part two:", scenicScores.sort((a, b) => b - a)[0]);
