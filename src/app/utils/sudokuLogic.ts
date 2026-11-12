import { Difficulty } from '../types/sudoku';

export function getBoxDimensions(size: number): { boxRows: number; boxCols: number } {
  if (size === 4) return { boxRows: 2, boxCols: 2 };
  if (size === 6) return { boxRows: 2, boxCols: 3 };
  return { boxRows: 3, boxCols: 3 };
}

function isValid(
  board: number[][],
  row: number,
  col: number,
  num: number,
  size: number,
  boxRows: number,
  boxCols: number
): boolean {
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / boxRows) * boxRows;
  const startCol = Math.floor(col / boxCols) * boxCols;

  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      if (board[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

function solveBoard(
  board: number[][],
  size: number,
  boxRows: number,
  boxCols: number,
  randomize = false
): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        const nums = Array.from({ length: size }, (_, i) => i + 1);
        if (randomize) nums.sort(() => Math.random() - 0.5);

        for (const num of nums) {
          if (isValid(board, row, col, num, size, boxRows, boxCols)) {
            board[row][col] = num;
            if (solveBoard(board, size, boxRows, boxCols, randomize)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generatePuzzle(size: number, difficulty: Difficulty) {
  const { boxRows, boxCols } = getBoxDimensions(size);
  const solved: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  solveBoard(solved, size, boxRows, boxCols, true);

  const puzzle = solved.map((row) => [...row]);
  const totalCells = size * size;

  const removeRatio = difficulty === 'easy' ? 0.35 : difficulty === 'medium' ? 0.5 : 0.65;
  let cellsToRemove = Math.floor(totalCells * removeRatio);

  while (cellsToRemove > 0) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      cellsToRemove--;
    }
  }

  return {
    initialGrid: puzzle.map((row) => row.map((v) => (v === 0 ? '' : String(v)))),
    solutionGrid: solved.map((row) => row.map((v) => String(v))),
    boxRows,
    boxCols,
  };
}
