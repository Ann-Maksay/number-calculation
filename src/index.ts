import fs from "fs";
import path from "path";
import readline from "readline";
import { performance } from "perf_hooks";

import {
  calculateMedian,
  findLongestDecreasingSequence,
  findLongestIncreasingSequence,
  formatSequence,
} from "./helpers/helpers";

const startTime = performance.now();
const filePath = path.join(__dirname, "data", "10m.txt");
const fileStream = fs.createReadStream(filePath);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let numbers: number[] = [];
let largestNumber = Number.NEGATIVE_INFINITY;
let smallestNumber = Number.POSITIVE_INFINITY;
let sum = 0;
let count = 0;

rl.on("line", (line) => {
  const number = Number(line);
  if (!isNaN(number)) {
    numbers.push(number);
    sum += number;
    count += 1;

    if (number > largestNumber) {
      largestNumber = number;
    }

    if (number < smallestNumber) {
      smallestNumber = number;
    }
  }
});

rl.on("close", () => {
  const mean = sum / count;
  const longestIncreasingSequence = findLongestIncreasingSequence(numbers);
  const longestDecreasingSequence = findLongestDecreasingSequence(numbers);
  numbers.sort((a, b) => a - b);
  const median = calculateMedian(numbers);

  console.log("The largest number is:", largestNumber);
  console.log("The smallest number is:", smallestNumber);
  console.log("The arithmetic mean is:", mean);
  console.log("The median is:", median);
  console.log(
    "Longest increasing sequence:",
    formatSequence(longestIncreasingSequence)
  );
  console.log(
    "Longest decreasing sequence:",
    formatSequence(longestDecreasingSequence)
  );

  const endTime = performance.now();
  const executionTimeMs = endTime - startTime;
  const executionTimeSec = executionTimeMs / 1000;

  console.log(`Execution time: ${executionTimeSec.toFixed(2)} seconds`);
});

rl.on("error", (err) => {
  console.error("Error reading the file:", err);
});
