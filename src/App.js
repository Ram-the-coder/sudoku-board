import React, { useEffect } from "react";
import Controls from "./components/Controls";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import SudokuBoard from "./components/SudokuBoard";
import './App.css';
import { useSelector } from "react-redux";
import { saveStateToLocalStorage } from "./store";

function App() {
  const state = useSelector(state => state);
  useEffect(() => saveStateToLocalStorage(state), [state])
  return (
    <div className="App">
      <SudokuBoard />
      <Controls />
      <KeyboardShortcuts />
    </div>
  );
}

export default App;
