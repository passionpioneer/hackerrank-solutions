function reachTheEnd(grid, maxTime) {
  // Get dimensions of the grid
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to check if a cell is valid
  function isValid(row, col) {
    return (
      row >= 0 && row < rows && col >= 0 && col < cols && grid[row][col] !== '#'
    );
  }

  // BFS to find the shortest path
  const queue = [[0, 0, 0]]; // [row, col, time]
  const visited = new Set();

  while (queue.length > 0) {
    const [row, col, time] = queue.shift();
    const key = `${row}-${col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (row === rows - 1 && col === cols - 1) {
      return time <= maxTime ? 'Yes' : 'No';
    }

    if (time >= maxTime) continue;

    // Explore neighbors
    if (isValid(row + 1, col)) queue.push([row + 1, col, time + 1]);
    if (isValid(row - 1, col)) queue.push([row - 1, col, time + 1]);
    if (isValid(row, col + 1)) queue.push([row, col + 1, time + 1]);
    if (isValid(row, col - 1)) queue.push([row, col - 1, time + 1]);
  }

  return 'No';
}
