// day7.js
// Advent of Code 2020 - Day 7: Handy Haversacks
// Run with:  node day7.js

const fs = require("fs");
const path = require("path");

// ----------------- read the input file -----------------
const inputPath = path.join(__dirname, "day7.txt"); // make sure day7.txt exists here
const text = fs.readFileSync(inputPath, "utf8").trim();

// Each non-empty line is one rule
const lines = text.split(/\r?\n/);

// contains: map outerColor -> array of { count, color } for inner bags
const contains = new Map();

for (let line of lines) {
  line = line.trim();
  if (!line) continue; // skip blank lines or junk

  // Expect something like: "light red bags contain 1 bright white bag, 2 muted yellow bags."
  const parts = line.split(" bags contain ");
  if (parts.length !== 2) continue; // ignore any lines that don't match

  const outerColor = parts[0].trim();
  const innerPart = parts[1].trim().replace(/\.$/, ""); // remove trailing '.'

  const contents = [];

  if (innerPart !== "no other bags") {
    // Split on commas: "1 bright white bag, 2 muted yellow bags"
    innerPart.split(",").forEach(chunk => {
      chunk = chunk.trim();
      const m = chunk.match(/^(\d+)\s+(.+?)\s+bag/);
      if (!m) return;
      contents.push({
        count: parseInt(m[1], 10),
        color: m[2]
      });
    });
  }

  contains.set(outerColor, contents);
}

// --------------- Part 1: how many can contain shiny gold? ----------------

const memoCanContain = new Map();

/**
 * Returns true if this color can eventually contain targetColor.
 */
function canContain(color, targetColor) {
  if (memoCanContain.has(color)) return memoCanContain.get(color);

  const contents = contains.get(color) || [];

  for (const { color: innerColor } of contents) {
    if (innerColor === targetColor || canContain(innerColor, targetColor)) {
      memoCanContain.set(color, true);
      return true;
    }
  }

  memoCanContain.set(color, false);
  return false;
}

let part1 = 0;
for (const color of contains.keys()) {
  if (color === "shiny gold") continue; // we only care about outer bags
  if (canContain(color, "shiny gold")) part1++;
}

// --------------- Part 2: how many bags inside shiny gold? ----------------

const memoCountInside = new Map();

/**
 * Number of bags contained inside a single bag of this color.
 */
function countInside(color) {
  if (memoCountInside.has(color)) return memoCountInside.get(color);

  const contents = contains.get(color) || [];
  let total = 0;

  for (const { count, color: innerColor } of contents) {
    // For each inner bag: count * (itself + all inside it)
    total += count * (1 + countInside(innerColor));
  }

  memoCountInside.set(color, total);
  return total;
}

const part2 = countInside("shiny gold");

// --------------- print results ----------------
console.log("Part 1:", part1);
console.log("Part 2:", part2);
