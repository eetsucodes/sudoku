'use client';

import React from 'react';
import { BoardConfig } from '../types/sudoku';

interface SudokuGridProps {
  grid: string[][];
  initialGrid: string[][];
  solution: string[][];
  isChecked: boolean;
  config: BoardConfig;
  onCellChange: (rowIndex: number, colIndex: number, value: string) => void;
}

export default function SudokuGrid({
  grid,
  initialGrid,
  solution,
  isChecked,
  config,
  onCellChange,
}: SudokuGridProps) {
  const { size, boxRows, boxCols } = config;

  // Map dynamic grid columns explicitly so Tailwind includes the classes
  const gridColsClass =
    size === 4 ? 'grid-cols-4' : size === 6 ? 'grid-cols-6' : 'grid-cols-9';

  const cellSizeClass =
    size === 9 ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-12 w-12 sm:h-14 sm:w-14';

  return (
    <div
      className={`mx-auto grid w-fit overflow-hidden rounded-lg border-4 border-slate-900 bg-white shadow-2xl ${gridColsClass}`}
    >
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => {
          const isLocked = initialGrid[rowIndex][colIndex] !== '';
          const isThickRight = (colIndex + 1) % boxCols === 0 && colIndex !== size - 1;
          const isThickBottom = (rowIndex + 1) % boxRows === 0 && rowIndex !== size - 1;

          // Determine cell highlight colors when "Check Answer" is active
          let statusClasses = isLocked
            ? 'bg-slate-100 font-bold text-slate-900'
            : 'bg-white font-semibold text-blue-600 focus:bg-blue-50';

          if (!isLocked && isChecked && cellValue !== '') {
            const isCorrect = cellValue === solution[rowIndex][colIndex];
            statusClasses = isCorrect
              ? 'bg-emerald-100 font-semibold text-emerald-800'
              : 'bg-rose-100 font-semibold text-rose-700';
          }

          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={cellValue}
              disabled={isLocked}
              onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
              className={`${cellSizeClass} text-center text-lg outline-none transition-colors
                border-r border-b border-slate-300
                ${isThickRight ? 'border-r-2 border-r-slate-900' : ''}
                ${isThickBottom ? 'border-b-2 border-b-slate-900' : ''}
                ${statusClasses}
              `}
            />
          );
        })
      )}
    </div>
  );
}
