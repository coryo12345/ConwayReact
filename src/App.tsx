import { useEffect } from "react";
import { ConfigBar } from "./components/ConfigBar";
import { ConwayGame } from "./components/ConwayGame";
import { clearBoard } from "./state";
import constants from "./constants";

function App() {
  useEffect(() => {
    clearBoard(constants.INITIAL_BOARD_SIZE);
  }, []);

  return (
    <main>
      <ConfigBar />
      <ConwayGame />
    </main>
  );
}

export default App;
