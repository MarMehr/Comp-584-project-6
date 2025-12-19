const fs = require("fs");

// Read and split lines from day2.txt
const lines = fs.readFileSync("day2.txt", "utf8")
  .trim()
  .split(/\r?\n/);

// Parse each line into { min, max, letter, password }
function parseLine(line) {
  // Example line: "1-3 a: abcde"
  const match = line.match(/^(\d+)-(\d+)\s+([a-z]):\s+([a-z]+)$/i);
  if (!match) {
    throw new Error("Could not parse line: " + line);
  }
  return {
    min: Number(match[1]),
    max: Number(match[2]),
    letter: match[3],
    password: match[4],
  };
}

const entries = lines.map(parseLine);

// ----- Part 1 -----
// Policy: letter must appear between min and max times (inclusive)
function isValidPart1(entry) {
  const count = [...entry.password].filter(ch => ch === entry.letter).length;
  return count >= entry.min && count <= entry.max;
}

function part1(entries) {
  return entries.filter(isValidPart1).length;
}

// ----- Part 2 -----
// Policy: letter must appear in exactly ONE of the given positions (1-based)
function isValidPart2(entry) {
  const pos1 = entry.min - 1; // convert to 0-based index
  const pos2 = entry.max - 1;
  const pw = entry.password;
  const c1 = pw[pos1] === entry.letter;
  const c2 = pw[pos2] === entry.letter;
  return (c1 || c2) && !(c1 && c2); // XOR
}

function part2(entries) {
  return entries.filter(isValidPart2).length;
}

console.log("Part 1 valid passwords:", part1(entries));
console.log("Part 2 valid passwords:", part2(entries));
