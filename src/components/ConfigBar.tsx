import { Pause, Play } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import constants from "../constants";
import { boardState, clearBoard, toggleRun } from "../state";

export function ConfigBar() {
  const clear = () => {
    clearBoard(boardState.board.length);
  };

  return (
    <div className="flex justify-between items-center p-2 mb-8 shadow flex-wrap">
      <PlayPause />
      <button
        className="bg-secondary text-secondary-foreground border rounded px-2 py-1"
        onClick={clear}
      >
        Clear Board
      </button>
      <div className="flex-1"></div>
      <SizeInput />
    </div>
  );
}

const PlayPause = () => {
  const boardSnap = useSnapshot(boardState);

  const spaceHandler = (e: KeyboardEvent) => {
    if (e.key === " ") {
      toggleRun();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", spaceHandler);

    return () => {
      window.removeEventListener("keypress", spaceHandler);
    };
  }, []);

  return (
    <button
      className="bg-primary rounded text-primary-foreground px-4 py-1 mr-2"
      onClick={toggleRun}
    >
      {boardSnap.run ? (
        <Pause className="h-6 w-6" />
      ) : (
        <Play className="h-6 w-6" />
      )}
    </button>
  );
};

const SizeInput = () => {
  const [val, setVal] = useState(constants.INITIAL_BOARD_SIZE);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const num = parseInt(e.currentTarget.value);
    if (isNaN(num)) return;
    if (num < 1) {
      setVal(1);
    } else if (num > constants.MAX_BOARD_SIZE) {
      setVal(constants.MAX_BOARD_SIZE);
    } else {
      setVal(num);
    }
  };

  const setBoard = () => {
    clearBoard(val);
  };

  return (
    <>
      <input
        type="number"
        className="border rounded px-2 py-1 w-20 mr-2"
        value={val}
        onInput={handleChange}
      />
      <button
        className="bg-primary text-primary-foreground rounded px-4 py-1"
        onClick={setBoard}
      >
        Set Board Size
      </button>
    </>
  );
};
