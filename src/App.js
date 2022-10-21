import React, { useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { useDispatch, useSelector } from 'react-redux'
import { handleKeyPress, setSelected } from "./reducers/boardSlice";

function App() {
  const board = useSelector(state => state.board)
  const dispatch = useDispatch();

  useEffect(() => {
    function handleMoveSelected(key) {
      const moveTo = ({ row, col }) => {
        return dispatch(setSelected({ row, col }))
      }
      const { selected } = board;
      if (!selected) return;
      const { row, col } = selected;
      if(['a', 'arrowleft'].includes(key)) return moveTo({ row, col: col === 0 ? 8 : col-1 })
      if(['d', 'arrowright'].includes(key)) return moveTo({ row, col: col === 8 ? 0 : col+1 })
      if(['w', 'arrowup'].includes(key)) return moveTo({ row: row === 0 ? 8 : row-1, col })
      if(['s', 'arrowdown'].includes(key)) return moveTo({ row: row === 8 ? 0 : row+1, col })
    }
    function handleClear() {
      const { selected, cells } = board;
      if (!selected) return;
      const { row, col } = selected;
      const { given } = cells[row][col];
      if (given) dispatch(handleKeyPress(given))
    }
    function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      if(['a', 's', 'd', 'w', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) 
        return handleMoveSelected(e.key.toLowerCase())
      if(['backspace', 'delete'].includes(key)) 
        return handleClear();
      return dispatch(handleKeyPress(e.key))
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [board, dispatch])

  return (
    <div className="App">
      <SudokuBoard />
    </div>
  );
}

export default App;
