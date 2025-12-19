const fs = require("fs");

// Read the map from day3.txt
const lines = fs.readFileSync("day3.txt", "utf8")
  .trim()
  .split(/\r?\n/);

// Each line is a row of the map, repeating infinitely to the right
const width = lines[0].length;

// Count trees for a given slope (right, down)
function countTrees(right, down) {
  let row = 0;
  let col = 0;
  let trees = 0;

  while (row < lines.length) {
    const cell = lines[row][col % width]; // wrap horizontally with %
    if (cell === "#") {
      trees++;
    }
    row += down;
    col += right;
  }

  return trees;
}

// Part 1: slope right 3, down 1
const part1Trees = countTrees(3, 1);
console.log("Part 1 - Trees on slope (right 3, down 1):", part1Trees);

// Part 2: multiply trees for these slopes
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let product = 1;
for (const [right, down] of slopes) {
  const trees = countTrees(right, down);
  console.log(`Slope right ${right}, down ${down}:`, trees);
  product *= trees;
}

console.log("Part 2 - Product of all slopes:", product);
