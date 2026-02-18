/* eslint-env node */

const fs = require("fs");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node normalize-names.js input.json output.json");
  process.exit(1);
}

const rules = JSON.parse(fs.readFileSync("rules.json", "utf8"));
const jsonData = JSON.parse(fs.readFileSync(inputFile, "utf8"));

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// prepare rules
const preparedRules = rules.map(rule => ({
  canonical: rule.canonical,
  variants: [...rule.variants]
    .sort((a, b) => b.length - a.length)
    .filter(v => v !== rule.canonical)
    .map(v => ({
      raw: v,
      regex: new RegExp(`\\b${escapeRegex(v)}\\b`, "gi")
    }))
}));

let changeCount = 0;

// only canonical variants
function normalizeName(name, path) {
  let result = name;

  for (const rule of preparedRules) {
    if (result.includes(rule.canonical)) {
      continue;
    }
    for (const variant of rule.variants) {
      if (variant.regex.test(result)) {
        const before = result;
        result = result.replace(variant.regex, rule.canonical);

        if (before !== result) {
          console.log(`🔁 ${path}: "${before}" → "${result}"`);
          changeCount++;
        }
      }
    }
  }

  return result;
}

function walk(obj, path = "$") {
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walk(item, `${path}[${i}]`));
    return;
  }

  if (typeof obj === "object" && obj !== null) {
    for (const key of Object.keys(obj)) {
      const currentPath = `${path}.${key}`;

      if (key === "name" && typeof obj[key] === "string") {
        obj[key] = normalizeName(obj[key], currentPath);
      } else {
        walk(obj[key], currentPath);
      }
    }
  }
}


walk(jsonData);

fs.writeFileSync(
  outputFile,
  JSON.stringify(jsonData, null, 2),
  "utf8"
);

console.log(`✅ Done. ${changeCount} changes applied.`);