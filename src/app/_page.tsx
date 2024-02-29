"use client";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const initalBoard = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  const [board, setBoard] = useState(initalBoard);

  function solveSudoku() {
    const solvedBoard = JSON.parse(JSON.stringify(board)); // create a deep copy of the board
    solve(solvedBoard);
    setBoard(solvedBoard);
  }

  function solve(board: string[][]): boolean {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, i, j, num.toString())) {
              board[i][j] = num.toString();
              if (solve(board)) {
                return true;
              }
              board[i][j] = ".";
            }
          }
          return false;
        }
      }
    }
    setBoard(board);
    return true;
  }

  function isValid(
    board: string[][],
    row: number,
    col: number,
    num: string,
  ): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) {
        return false;
      }
      if (board[row][i] === num) {
        return false;
      }
      if (
        board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
          3 * Math.floor(col / 3) + (i % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  }

  return (
    <main className={styles.main}>
      <table className={styles.table}>
        <tbody>
          {board.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, cIndex) => (
                <td key={cIndex}>
                  <input
                    className={styles.cell}
                    defaultValue={cell !== "." ? cell : ""}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.controls}>
        <button className={styles.solve} onClick={() => solveSudoku}>
          Solve
        </button>
      </div>
    </main>
  );
}
