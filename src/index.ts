import fs from "fs";
import path from "path";
import readline from "readline";
import { performance } from "perf_hooks";

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
  numbers.sort((a, b) => a - b);
  const median = calculateMedian(numbers);

  console.log("The largest number is:", largestNumber);
  console.log("The smallest number is:", smallestNumber);
  console.log("The arithmetic mean is:", mean);
  console.log("The median is:", median);

  const endTime = performance.now();
  const executionTimeMs = endTime - startTime;
  const executionTimeSec = executionTimeMs / 1000;

  console.log(`Execution time: ${executionTimeSec.toFixed(2)} seconds`);
});

rl.on("error", (err) => {
  console.error("Error reading the file:", err);
});

function calculateMedian(arr: number[]): number {
  const middle = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middle - 1] + arr[middle]) / 2;
  } else {
    return arr[middle];
  }
}
