'use client';

import React from 'react';
import { Difficulty } from '../types/sudoku';

interface SudokuControlsProps {
  height: number;
  width: number;
  difficulty: Difficulty;
  isVisible: boolean;
  onDimensionChange: (val: number) => void;
  onDifficultyChange: (val: Difficulty) => void;
  onGenerate: () => void;
  onCheckAnswer: () => void;
  onSolve: () => void;
}

export default function SudokuControls({
  height,
  width,
  difficulty,
  isVisible,
  onDimensionChange,
  onDifficultyChange,
  onGenerate,
  onCheckAnswer,
  onSolve,
}: SudokuControlsProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        Height
        <select
          value={height}
          onChange={(e) => onDimensionChange(Number(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        Width
        <select
          value={width}
          onChange={(e) => onDimensionChange(Number(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        Difficulty
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button
        onClick={onGenerate}
        className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
      >
        {isVisible ? 'New Puzzle' : 'Start Game'}
      </button>

      {isVisible && (
        <>
          <button
            onClick={onCheckAnswer}
            className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-500"
          >
            Check Answer
          </button>

          <button
            onClick={onSolve}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-500"
          >
            Solve
          </button>
        </>
      )}
    </div>
  );
}
