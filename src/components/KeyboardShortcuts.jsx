import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCell,
  EDIT_MODE,
  handleKeyPress,
  setEditMode,
  setSelected,
} from "../reducers/boardSlice";

export default function KeyboardShortcuts() {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleMoveSelected(key) {
      const { selected } = board;
      if (!selected) return;
      const { row, col } = selected;
      const moveTo = ({ row, col }) => dispatch(setSelected({ row, col }));
      if (["a", "arrowleft"].includes(key))
        return moveTo({ row, col: col === 0 ? 8 : col - 1 });
      if (["d", "arrowright"].includes(key))
        return moveTo({ row, col: col === 8 ? 0 : col + 1 });
      if (["w", "arrowup"].includes(key))
        return moveTo({ row: row === 0 ? 8 : row - 1, col });
      if (["s", "arrowdown"].includes(key))
        return moveTo({ row: row === 8 ? 0 : row + 1, col });
    }

    function handleClear() {
      dispatch(clearSelectedCell());
    }

    function cycleMode({ reverse } = {}) {
      const { editMode, isStarted } = board;
      const modeOrder = [
        ...(isStarted ? [] : [EDIT_MODE.GIVEN]),
        EDIT_MODE.SOLUTION,
        EDIT_MODE.PENCIL_MARK_CORNER,
        EDIT_MODE.PENCIL_MARK_CENTER,
      ];
      const currentIndex = modeOrder.indexOf(editMode);
      const nextModeIndex =
        currentIndex === modeOrder.length - 1 ? 0 : currentIndex + 1;
      const prevModeIndex =
        currentIndex === 0 ? modeOrder.length - 1 : currentIndex - 1;
      const modeToSet = reverse
        ? modeOrder[prevModeIndex]
        : modeOrder[nextModeIndex];
      dispatch(setEditMode(modeToSet));
    }

    function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      const { shiftKey, ctrlKey } = e;
      if (
        [
          "a",
          "s",
          "d",
          "w",
          "arrowleft",
          "arrowright",
          "arrowup",
          "arrowdown",
        ].includes(key)
      )
        return handleMoveSelected(e.key.toLowerCase());

      if (["backspace", "delete"].includes(key)) return handleClear();

      if (ctrlKey) return cycleMode();

      if (shiftKey) return cycleMode({ reverse: true });

      return dispatch(handleKeyPress(e.key));
    }
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [board, dispatch]);

  return null;
}
