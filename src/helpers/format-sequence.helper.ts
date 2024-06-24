export function formatSequence(sequence: number[]): string {
  return `[${sequence.join(", ")}] (length: ${sequence.length})`;
}
