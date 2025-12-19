const fs = require('fs');

// Read input file
const numbers = fs.readFileSync('day1.txt', 'utf8')
  .trim()
  .split('\n')
  .map(Number);

// --- Part 1: Find 2 numbers that sum to 2020 ---
function part1(nums) {
  const seen = new Set();
  for (let x of nums) {
    let y = 2020 - x;
    if (seen.has(y)) {
      return x * y;
    }
    seen.add(x);
  }
}

console.log("Part 1 Answer:", part1(numbers));


// --- Part 2: Find 3 numbers that sum to 2020 ---
function part2(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 2020) {
          return nums[i] * nums[j] * nums[k];
        }
      }
    }
  }
}

console.log("Part 2 Answer:", part2(numbers));
