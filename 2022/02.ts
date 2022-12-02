const textInput = Deno.readTextFileSync("./02-input").trim();

const LOSS = 0;
const DRAW = 3;
const WIN = 6;

type Score = typeof LOSS | typeof WIN | typeof DRAW;

const MOVES = ["A", "B", "C"] as const;
type Move = typeof MOVES[number];

function getRelativeMove(move: Move, relative: -1 | 1): Move {
  let nextIndex = (MOVES.indexOf(move) + relative) % MOVES.length;
  if (nextIndex < 0) nextIndex = MOVES.length - 1;
  return MOVES[nextIndex];
}

function beats(m2: Move, m1: Move): boolean {
  const nextMove = getRelativeMove(m1, +1);
  if (m2 === nextMove) return true;
  return false;
}

function scoreFromMatch(op: Move, me: Move): 0 | 3 | 6 {
  if (op == me) return DRAW;
  if (beats(op, me)) return LOSS;
  return WIN;
}

function normaliseMoves(line: string): string {
  return line.replace("X", "A").replace("Y", "B").replace("Z", "C");
}

function moveFromResult(op: Move, res: Score): Move {
  if (res === DRAW) return op;
  if (res === WIN) return getRelativeMove(op, +1);
  if (res === LOSS) return getRelativeMove(op, -1);
  return undefined as never;
}

function scoreFromResult(res: "X" | "Y" | "Z"): Score {
  if (res === "X") return LOSS;
  if (res === "Y") return DRAW;
  if (res === "Z") return WIN;
  return undefined as never;
}

const totalScore1 = textInput.split("\n").reduce(
  (total, line) => {
    const [op, me] = normaliseMoves(line).split(" ") as [Move, Move];
    const result = scoreFromMatch(op, me);
    const moveScore = MOVES.indexOf(me) + 1;
    total += result + moveScore;
    return total;
  },
  0,
);
console.log("Part one: ", totalScore1);

const totalScore2 = textInput.split("\n").reduce(
  (total, line) => {
    const [op, res] = line.split(" ") as [Move, "X" | "Y" | "Z"];
    const score = scoreFromResult(res);
    const me = moveFromResult(op, score);
    const moveScore = MOVES.indexOf(me) + 1;
    total += score + moveScore;
    return total;
  },
  0,
);
console.log("Part two: ", totalScore2);
