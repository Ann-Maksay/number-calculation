export function findLongestDecreasingSequence(arr: number[]): number[] {
  let currentSequence: number[] = [];
  let longestSequence: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i] < arr[i - 1]) {
      currentSequence.push(arr[i]);
    } else {
      if (currentSequence.length > longestSequence.length) {
        longestSequence = currentSequence;
      }
      currentSequence = [arr[i]];
    }
  }

  if (currentSequence.length > longestSequence.length) {
    longestSequence = currentSequence;
  }

  return longestSequence;
}
