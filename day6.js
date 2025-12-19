const fs = require("fs");

// Read the whole input file as a string.
// Make sure day6.txt is in the same folder as this JS file.
const raw = fs.readFileSync("day6.txt", "utf8").trim();

// Each group is separated by a blank line.
// This regex splits on one or more empty lines, handling Windows or Unix line endings.
const groups = raw.split(/\r?\n\r?\n/);

// ---------- Part 1: For each group, count questions where *anyone* answered "yes" ----------

let sumAnyYes = 0;

for (const group of groups) {
  // Remove line breaks inside the group so we get all answers as one long string
  // Example group:
  //   abc
  //   ab
  // becomes "abcab"
  const answersCombined = group.replace(/\r?\n/g, "");

  // Put each character into a Set to keep only unique letters (a–z)
  const uniqueQuestions = new Set(answersCombined.split(""));

  // Add the number of unique "yes" answers for this group
  sumAnyYes += uniqueQuestions.size;
}

console.log("Part 1 - Sum of counts where ANYONE answered yes:", sumAnyYes);

// ---------- (Bonus) Part 2: Everyone in the group answered "yes" ----------
// If you only need Part 1, you can ignore everything below this line.

let sumAllYes = 0;

for (const group of groups) {
  // Split the group into individual people (one line per person)
  const people = group.split(/\r?\n/);

  // Start with a Set of the first person's answers
  let common = new Set(people[0].split(""));

  // For each other person, intersect with the current "common" set
  for (let i = 1; i < people.length; i++) {
    const personAnswers = new Set(people[i].split(""));
    const nextCommon = new Set();

    // Keep only answers that are in both sets
    for (const ch of common) {
      if (personAnswers.has(ch)) {
        nextCommon.add(ch);
      }
    }

    common = nextCommon; // update to the intersection so far
  }

  // The size of "common" is how many questions *everyone* in that group said "yes" to
  sumAllYes += common.size;
}

console.log("Part 2 - Sum of counts where EVERYONE answered yes:", sumAllYes);
