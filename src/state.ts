import { proxy } from "valtio";
import { Board, Cell, CellState } from "./models/board";

export const boardState = proxy<{
  board: Board;
  run: boolean;
  cyclesPerSec: number;
}>({
  board: [],
  run: false,
  cyclesPerSec: 2,
});

export function clearBoard(size?: number) {
  if (typeof size !== "number") {
    size = boardState.board.length;
  }

  const newBoard: Board = [];

  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push({
        row: i,
        column: j,
        state: CellState.DEAD,
      });
    }
    newBoard.push(row);
  }

  boardState.board = newBoard;
}

let interval: number;
export function toggleRun() {
  if (boardState.run) {
    boardState.run = false;
    clearInterval(interval);
  } else {
    boardState.run = true;
    interval = setInterval(cycleBoard, 1000 / boardState.cyclesPerSec);
  }
}

function cycleBoard() {
  // Conway rules:
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

  const newBoard: Board = [];
  const N = boardState.board.length;

  for (let r = 0; r < N; r++) {
    newBoard.push(Array(N));
    for (let c = 0; c < N; c++) {
      let neighbors = 0;

      if (boardState.board[r - 1]?.[c - 1]?.state === CellState.ALIVE)
        neighbors++;
      if (boardState.board[r - 1]?.[c]?.state === CellState.ALIVE) neighbors++;
      if (boardState.board[r - 1]?.[c + 1]?.state === CellState.ALIVE)
        neighbors++;
      if (boardState.board[r]?.[c - 1]?.state === CellState.ALIVE) neighbors++;
      if (boardState.board[r]?.[c + 1]?.state === CellState.ALIVE) neighbors++;
      if (boardState.board[r + 1]?.[c - 1]?.state === CellState.ALIVE)
        neighbors++;
      if (boardState.board[r + 1]?.[c]?.state === CellState.ALIVE) neighbors++;
      if (boardState.board[r + 1]?.[c + 1]?.state === CellState.ALIVE)
        neighbors++;

      // update newboard
      const alive = boardState.board[r][c].state === CellState.ALIVE;

      if (alive && (neighbors === 2 || neighbors === 3)) {
        newBoard[r][c] = { row: r, column: c, state: CellState.ALIVE };
      } else if (!alive && neighbors === 3) {
        newBoard[r][c] = { row: r, column: c, state: CellState.ALIVE };
      } else {
        newBoard[r][c] = { row: r, column: c, state: CellState.DEAD };
      }
    }
  }

  boardState.board = newBoard;
}
