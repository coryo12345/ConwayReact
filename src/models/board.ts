export enum CellState {
  ALIVE,
  DEAD,
}

export interface Cell {
  row: number;
  column: number;
  state: CellState;
}

export type Board = Cell[][];
