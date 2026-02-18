'use strict';

const fs = require("fs");
const path = require("path");

const DIR = "./../data";
const seasons = new Set();

fs.readdirSync(DIR).forEach(file => {
  if (!file.endsWith(".json")) return;

  const fullPath = path.join(DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  try {
    const data = JSON.parse(raw);

    if (data.season) {
      seasons.add(data.season);
    } else {
      console.warn("Keine season in:", file);
    }

  } catch (e) {
    console.error("Ungültiges JSON:", file);
  }
});

console.log("Gefundene Seasons:");
console.log([...seasons].sort());