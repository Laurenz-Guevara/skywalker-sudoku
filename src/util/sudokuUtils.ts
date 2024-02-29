function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function solve(
  board: string[][],
  animateSolve: boolean,
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>,
): Promise<boolean> {
  for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
    for (let colIdx = 0; colIdx < 9; colIdx++) {
      if (board[rowIdx][colIdx] === ".") {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, rowIdx, colIdx, num.toString())) {
            board[rowIdx][colIdx] = num.toString();
            if (animateSolve) {
              setBoard([...board]);
              await delay(1);
            }

            if (await solve(board, animateSolve, setBoard)) {
              return true;
            } else {
              board[rowIdx][colIdx] = ".";
              if (animateSolve) {
                setBoard([...board]);
                await delay(1);
              }
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(
  board: string[][],
  targetRow: number,
  targetCol: number,
  num: string,
) {
  for (let checkIdx = 0; checkIdx < 9; checkIdx++) {
    if (board[checkIdx][targetCol] === num) {
      return false;
    }
    if (board[targetRow][checkIdx] === num) {
      return false;
    }
    const boxRow = 3 * Math.floor(targetRow / 3) + Math.floor(checkIdx / 3);
    const boxCol = 3 * Math.floor(targetCol / 3) + (checkIdx % 3);
    if (board[boxRow][boxCol] === num) {
      return false;
    }
  }
  return true;
}

export function isValidSudoku(board: string[][]): boolean {
  if (!board.flat().every(cell => /^[\d.]$/.test(cell))) {
    return false;
  }

  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    const row = board[i];
    const set = new Set<string>();
    for (let j = 0; j < cols; j++) {
      const cell = row[j];
      if (cell !== ".") {
        if (set.has(cell)) {
          return false;
        } else {
          set.add(cell);
        }
      }
    }
  }

  for (let j = 0; j < cols; j++) {
    const set = new Set<string>();
    for (let i = 0; i < rows; i++) {
      const cell = board[i][j];
      if (cell !== ".") {
        if (set.has(cell)) {
          return false;
        } else {
          set.add(cell);
        }
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    const set = new Set<string>();
    const rowStart = Math.floor(i / 3) * 3;
    const colStart = (i % 3) * 3;
    for (let j = 0; j < 9; j++) {
      const row = rowStart + Math.floor(j / 3);
      const col = colStart + (j % 3);
      const cell = board[row][col];
      if (cell !== ".") {
        if (set.has(cell)) {
          return false;
        } else {
          set.add(cell);
        }
      }
    }
  }

  return true;
}
