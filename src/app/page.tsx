'use client';

import React, { useState } from 'react';
import { BoardConfig, Difficulty } from './types/sudoku';
import { generatePuzzle } from './utils/sudokuLogic';
import SudokuControls from './components/SudokuControls';
import SudokuGrid from './components/SudokuGrid';

export default function MyApp() {
  const [height, setHeight] = useState<number>(9);
  const [width, setWidth] = useState<number>(9);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [grid, setGrid] = useState<string[][]>([]);
  const [initialGrid, setInitialGrid] = useState<string[][]>([]);
  const [solution, setSolution] = useState<string[][]>([]);
  const [config, setConfig] = useState<BoardConfig>({ size: 9, boxRows: 3, boxCols: 3 });

  const handleDimensionChange = (val: number) => {
    setHeight(val);
    setWidth(val);
    setStatusMessage(null);
  };

  const handleGenerate = () => {
    const isValidSize = height === 4 || height === 6 || height === 9;
    if (height !== width || !isValidSize) {
      setStatusMessage({
        text: 'Sudoku grids must be square with size 4x4, 6x6, or 9x9.',
        type: 'error',
      });
      return;
    }

    const { initialGrid: puzzle, solutionGrid, boxRows, boxCols } = generatePuzzle(
      height,
      difficulty
    );

    setConfig({ size: height, boxRows, boxCols });
    setInitialGrid(puzzle);
    setGrid(puzzle.map((row) => [...row]));
    setSolution(solutionGrid);
    setIsVisible(true);
    setIsChecked(false);
    setStatusMessage(null);
  };


  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const validRegex = new RegExp(`^[1-${config.size}]$`);
    if (value === '' || validRegex.test(value)) {
      const updated = grid.map((row, rIdx) =>
        row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
      );
      setGrid(updated);
      setIsChecked(false); // Clear highlights while editing
      setStatusMessage(null);
    }
  };

  const handleCheckAnswer = () => {
    setIsChecked(true);
    let hasEmpty = false;
    let hasMistake = false;

    for (let r = 0; r < config.size; r++) {
      for (let c = 0; c < config.size; c++) {
        if (grid[r][c] === '') {
          hasEmpty = true;
        } else if (grid[r][c] !== solution[r][c]) {
          hasMistake = true;
        }
      }
    }

    if (!hasEmpty && !hasMistake) {
      setStatusMessage({ text: 'Congratulations! You solved the Sudoku!', type: 'success' });
    } else if (hasMistake) {
      setStatusMessage({ text: 'Some numbers are incorrect. Highlighted in red!', type: 'error' });
    } else {
      setStatusMessage({ text: 'Everything entered so far is correct! Keep going.', type: 'success' });
    }
  };

  const handleSolve = () => {
    setGrid(solution.map((row) => [...row]));
    setIsChecked(false);
    setStatusMessage({ text: 'Puzzle solved automatically.', type: 'success' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-600 p-6">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white drop-shadow">
        Sudoku
      </h1>

      <SudokuControls
        height={height}
        width={width}
        difficulty={difficulty}
        isVisible={isVisible}
        onDimensionChange={handleDimensionChange}
        onDifficultyChange={setDifficulty}
        onGenerate={handleGenerate}
        onCheckAnswer={handleCheckAnswer}
        onSolve={handleSolve}
      />

      {statusMessage && (
        <div
          className={`mb-5 rounded-lg px-4 py-2 text-sm font-semibold shadow ${
            statusMessage.type === 'success'
              ? 'bg-emerald-100 text-emerald-900'
              : 'bg-rose-100 text-rose-900'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {isVisible && (
        <SudokuGrid
          grid={grid}
          initialGrid={initialGrid}
          solution={solution}
          isChecked={isChecked}
          config={config}
          onCellChange={handleCellChange}
        />
      )}
    </main>
  );
}
