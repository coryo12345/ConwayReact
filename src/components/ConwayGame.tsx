import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { Cell } from "../models/board";
import { boardState } from "../state";
import { Cell as BoardCell } from "./Cell";

export function ConwayGame() {
  const state = useSnapshot(boardState);

  const cells = useMemo<Cell[]>(() => {
    const cells: Cell[] = [];
    state.board.forEach((row) => {
      row.forEach((cell) => {
        cells.push(cell);
      });
    });
    return cells;
  }, [state.board]);

  return (
    <div className="flex justify-center">
      <div
        className="grid w-[90vmin] h-[90vmin]"
        style={{ gridTemplateColumns: `repeat(${state.board.length}, 1fr)` }}
      >
        {cells.map((cell) => (
          <BoardCell
            key={cell.row + "|" + cell.column + "|" + cell.state}
            cell={cell}
          />
        ))}
      </div>
    </div>
  );
}
