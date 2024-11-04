'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'findLargestSquareSize' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY samples as parameter.
 */

function findLargestSquareSize(samples) {
  const n = samples.length;
  if (n === 0) return 0;

  const m = samples[0].length; // Get number of columns
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  let maxSquareSize = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (samples[i][j] === 1) {
        if (samples[i][j] === 1) {
          dp[i][j] =
            i === 0 || j === 0
              ? 1
              : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
          maxSquareSize = Math.max(maxSquareSize, dp[i][j]);
        }

        maxSquareSize = Math.max(maxSquareSize, dp[i][j]);
      }
    }
  }

  return maxSquareSize;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const samplesRows = parseInt(readLine().trim(), 10);
  const samplesColumns = parseInt(readLine().trim(), 10);

  let samples = Array(samplesRows);

  for (let i = 0; i < samplesRows; i++) {
    samples[i] = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((samplesTemp) => parseInt(samplesTemp, 10));
  }

  const result = findLargestSquareSize(samples);

  ws.write(result + '\n');

  ws.end();
}
