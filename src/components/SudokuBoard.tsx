"use client";

import styles from "@/app/page.module.scss";
import { useState } from "react";
import { solve, isValidSudoku } from "@/util/sudokuUtils";
import Button from "@/components/Button";
import { Square, CheckSquare2, Eraser, Wrench } from "lucide-react";

const puzzles = [
  {
    title: "Easy",
    value: "easy",
    board: [
      ["5", "3", "4", "6", "7", ".", "9", "1", "2"],
      ["6", ".", "2", "1", "9", "5", ".", ".", "8"],
      [".", "9", ".", "3", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", "5", ".", ".", "2", "8", "."],
      [".", "8", ".", "4", "1", "9", ".", ".", "5"],
      ["3", "4", "5", ".", "8", ".", ".", "7", "9"],
    ],
  },
  {
    title: "Medium",
    value: "medium",
    board: [
      [".", "6", ".", ".", ".", "7", ".", "9", "3"],
      [".", "4", ".", ".", ".", "5", "8", "6", "."],
      [".", ".", ".", ".", "8", ".", "5", ".", "."],
      [".", "2", "6", ".", ".", "1", ".", ".", "."],
      [".", "7", "3", ".", ".", "6", "9", ".", "1"],
      [".", ".", ".", ".", "4", "9", ".", "7", "."],
      [".", ".", ".", ".", ".", ".", ".", "5", "8"],
      [".", ".", ".", ".", ".", ".", "6", "1", "2"],
      ["6", ".", "5", "1", ".", ".", ".", ".", "9"],
    ],
  },
  {
    title: "Hard",
    value: "hard",
    board: [
      [".", ".", "9", ".", ".", "1", ".", "7", "."],
      [".", ".", ".", "4", ".", ".", ".", "6", "."],
      ["5", ".", ".", ".", ".", "2", "9", ".", "4"],
      [".", "3", ".", ".", ".", "5", ".", ".", "."],
      [".", ".", "6", "2", ".", ".", "1", ".", "8"],
      [".", ".", ".", ".", ".", ".", ".", "4", "."],
      [".", ".", ".", ".", ".", ".", "7", ".", "."],
      ["6", ".", ".", ".", "1", ".", ".", ".", "."],
      [".", ".", "1", "8", ".", ".", "2", ".", "9"],
    ],
  },
];

export default function SudokuBoard() {
  const [board, setBoard] = useState(puzzles[0].board);
  const [animateSolve, setAnimateSolve] = useState(false);
  const [solving, setSolving] = useState(false);
  const [unsolvable, setUnsolvable] = useState(false);

  function clearBoard() {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill("."));
    setBoard(emptyBoard);
  }

  function handleInputChange(row: number, col: number, num: string) {
    const updatedBoard = [...board];
    updatedBoard[row][col] = num || ".";
    setBoard(updatedBoard);
    setUnsolvable(false);
  }

  async function solveSudoku() {
    if (!isValidSudoku(board)) {
      setUnsolvable(true);
      return;
    }

    setSolving(true);
    const solvedBoard = JSON.parse(JSON.stringify(board));
    const isSolvable = await solve(solvedBoard, animateSolve, (updateBoard) =>
      setBoard(updateBoard),
    );

    if (isSolvable) {
      setBoard(solvedBoard);
      setUnsolvable(false);
    } else {
      setUnsolvable(true);
    }

    setSolving(false);
  }

  return (
    <section>
      <div className={styles.panel}>
        <p>Difficulty</p>
        <div className={styles.difficultyOptions}>
          {puzzles.map((puzzle) => (
            <Button
              key={puzzle.title}
              type="default"
              onClick={() => {
                setBoard(puzzle.board);
              }}
              disabled={solving}
            >
              {puzzle.title}
            </Button>
          ))}
        </div>
      </div>
      <div>
        {board.map((row, rIndex) => (
          <div
            key={rIndex}
            className={`${styles.row} ${(rIndex + 1) % 3 === 0 ? styles.bottomBorder : ""}`}
          >
            {row.map((cell, cIndex) => (
              <div
                className={`${(cIndex + 1) % 3 === 0 ? styles.rightBorder : ""}`}
                key={cIndex}
              >
                <input
                  className={styles.cell}
                  value={cell !== "." ? cell : ""}
                  onChange={(e) =>
                    handleInputChange(rIndex, cIndex, e.target.value)
                  }
                  maxLength={1}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.panel}>
        <Button type="green" onClick={() => solveSudoku()} disabled={solving}>
          <span>
            Solve
            <Wrench />
          </span>
        </Button>
        <Button type="red" onClick={clearBoard} disabled={solving}>
          <span>
            Clear
            <Eraser />
          </span>
        </Button>
        <Button
          type="blue"
          onClick={() => setAnimateSolve(!animateSolve)}
          disabled={solving}
        >
          <span>
            Toggle Animation
            {animateSolve ? <CheckSquare2 /> : <Square />}
          </span>
        </Button>
      </div>
      <div className={`${styles.panel} ${unsolvable ? "" : styles.hidden}`}>
        <p>Invalid Sudoku Puzzle</p>
      </div>
    </section>
  );
}

