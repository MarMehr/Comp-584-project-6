const fs = require("fs");

// Read the boarding passes from day5.txt
// Make sure each boarding pass is on its own line.
const raw = fs.readFileSync("day5.txt", "utf8").trim();

// Split into an array of boarding pass strings
const passes = raw.split(/\r?\n/);

/**
 * Convert a boarding pass code like "FBFBBFFRLR" into a seat ID.
 * - First 7 chars: F/B = front/back -> row 0–127
 * - Last 3 chars: L/R = left/right -> column 0–7
 *
 * We can treat this like a binary number:
 * - F and L are 0
 * - B and R are 1
 */
function getSeatId(code) {
  // First 7 characters are the row
  const rowPart = code.slice(0, 7);
  // Last 3 characters are the column
  const colPart = code.slice(7);

  // Replace F -> 0, B -> 1 to get a binary string, then parse it
  const rowBinary = rowPart.replace(/F/g, "0").replace(/B/g, "1");
  const row = parseInt(rowBinary, 2);

  // Replace L -> 0, R -> 1 for the column
  const colBinary = colPart.replace(/L/g, "0").replace(/R/g, "1");
  const col = parseInt(colBinary, 2);

  // Seat ID formula: row * 8 + column
  return row * 8 + col;
}

// Calculate all seat IDs
const seatIds = passes.map(getSeatId);

// ---------- Part 1: Highest seat ID ----------

// Math.max can't take an array directly, so we spread it: ...seatIds
const highestSeatId = Math.max(...seatIds);
console.log("Part 1 - Highest seat ID:", highestSeatId);

// ---------- Bonus: Part 2 (optional) ----------
// Find your seat: the one missing ID where IDs before/after exist

// Sort seat IDs in ascending order
const sorted = seatIds.slice().sort((a, b) => a - b);

let mySeatId = null;
for (let i = 1; i < sorted.length; i++) {
  const prev = sorted[i - 1];
  const curr = sorted[i];

  // If the difference is 2, then the missing seat is in between
  if (curr - prev === 2) {
    mySeatId = prev + 1;
    break;
  }
}

console.log("Part 2 - Your seat ID (missing one):", mySeatId);
