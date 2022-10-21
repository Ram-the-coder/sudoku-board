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
      if('a' === key || 'arrowleft' === key) return moveTo({ row, col: col === 0 ? 8 : col-1 })
      if('d' === key || 'arrowright' === key) return moveTo({ row, col: col === 8 ? 0 : col+1 })
      if('w' === key || 'arrowup' === key) return moveTo({ row: row === 0 ? 8 : row-1, col })
      if('s' === key || 'arrowdown' === key) return moveTo({ row: row === 8 ? 0 : row+1, col })
    }
    function handleKeyUp(e) {
      const key = e.key.toLowerCase();
      if(['a', 's', 'd', 'w', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key)) 
        return handleMoveSelected(e.key.toLowerCase())
      return dispatch(handleKeyPress(e.key))
    }
    document.addEventListener('keydown', handleKeyUp)
    return () => document.removeEventListener('keydown', handleKeyUp)
  }, [board, dispatch])

  return (
    <div className="App">
      <SudokuBoard />
    </div>
  );
}

export default App;
