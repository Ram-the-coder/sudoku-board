import React from "react";
import Controls from "./components/Controls";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import SudokuBoard from "./components/SudokuBoard";
import './App.css';

function App() {
  return (
    <div className="App">
      <SudokuBoard />
      <Controls />
      <KeyboardShortcuts />
    </div>
  );
}

export default App;
