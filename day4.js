const fs = require("fs");

// Read entire input file
const raw = fs.readFileSync("day4.txt", "utf8").trim();

// Split passports on blank lines
const passportBlocks = raw.split(/\n\s*\n/);

// Convert each passport block into an object of key:value pairs
function parsePassport(block) {
  const fields = block.replace(/\n/g, " ").split(/\s+/);
  const passport = {};
  for (const field of fields) {
    const [key, value] = field.split(":");
    passport[key] = value;
  }
  return passport;
}

const passports = passportBlocks.map(parsePassport);

// ---------- PART 1 ----------
// Required fields (cid is optional)
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function isValidPart1(passport) {
  return requiredFields.every(field => passport.hasOwnProperty(field));
}

const validPart1 = passports.filter(isValidPart1).length;
console.log("Part 1 valid passports:", validPart1);

// ---------- PART 2 ----------

// Helper: check year range
function validYear(str, min, max) {
  if (!/^\d{4}$/.test(str)) return false;
  const year = parseInt(str, 10);
  return year >= min && year <= max;
}

// Helper: check height
function validHeight(hgt) {
  const match = /^(\d+)(cm|in)$/.exec(hgt);
  if (!match) return false;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  if (unit === "cm") return value >= 150 && value <= 193;
  if (unit === "in") return value >= 59 && value <= 76;
  return false;
}

// Helper: hair color
function validHairColor(hcl) {
  return /^#[0-9a-f]{6}$/.test(hcl);
}

// Helper: eye color
function validEyeColor(ecl) {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

// Helper: PID is 9 digits
function validPid(pid) {
  return /^\d{9}$/.test(pid);
}

function isValidPart2(passport) {
  if (!isValidPart1(passport)) return false;

  if (!validYear(passport.byr, 1920, 2002)) return false;
  if (!validYear(passport.iyr, 2010, 2020)) return false;
  if (!validYear(passport.eyr, 2020, 2030)) return false;
  if (!validHeight(passport.hgt)) return false;
  if (!validHairColor(passport.hcl)) return false;
  if (!validEyeColor(passport.ecl)) return false;
  if (!validPid(passport.pid)) return false;

  return true;
}

const validPart2 = passports.filter(isValidPart2).length;
console.log("Part 2 valid passports:", validPart2);
