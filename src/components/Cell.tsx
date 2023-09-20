import { Cell, CellState } from "../models/board";
import { boardState } from "../state";

interface Props {
  cell: Cell;
}

export function Cell({ cell }: Props) {
  const toggle = () => {
    const newState =
      cell.state === CellState.ALIVE ? CellState.DEAD : CellState.ALIVE;
    boardState.board[cell.row][cell.column] = { ...cell, state: newState };
  };

  return (
    <>
      {cell.state === CellState.ALIVE && (
        <span
          className="inline-block border bg-green-500"
          onClick={toggle}
        ></span>
      )}
      {cell.state === CellState.DEAD && (
        <span
          className="inline-block border bg-secondary"
          onClick={toggle}
        ></span>
      )}
    </>
  );
}
