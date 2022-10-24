import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_MODE, resetState, setEditMode, setStarted } from "../reducers/boardSlice";
import "./Controls.css";
import ValidityChecker from "./ValidityChecker";

export default function Controls() {
  const editMode = useSelector((state) => state.board.editMode);
  const isStarted = useSelector((state) => state.board.isStarted);
  const dispatch = useDispatch();
  const handleEditModeChange = (e) => dispatch(setEditMode(e.target.name));
  const handleStart = () => dispatch(setStarted(true));
  const handleReset = () => {
    const shouldReset = window.confirm('Are you sure you want to reset the board');
    if (!shouldReset) return;
    dispatch(resetState());
  }

  const RadioInput = ({ radioEditMode, disabled }) => (
    <div className="form-check mode-input d-grid gap-2">
      <input
        className="btn-check"
        id={radioEditMode}
        type="radio"
        name={radioEditMode}
        checked={editMode === radioEditMode}
        onChange={handleEditModeChange}
        disabled={disabled}
        aria-disabled={disabled}
      />
      <label className="btn btn-lg btn-outline-dark" htmlFor={radioEditMode}>
        {radioEditMode}
      </label>
    </div>
  );

  const modeInputs = [
    { radioEditMode: EDIT_MODE.SOLUTION },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CORNER },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CENTER },
    { radioEditMode: EDIT_MODE.GIVEN, disabled: isStarted },
  ];
  return (
    <div className="controls">
      <div className="mode">
        <div className="inputs">
          {modeInputs.map((props) => (
            <RadioInput key={props.radioEditMode} {...props} />
          ))}
        </div>
        <div className="button-controls d-grid gap-2">
          <button
            className="btn btn-lg btn-success"
            disabled={isStarted}
            onClick={handleStart}
          >
            {isStarted ? "Started" : "Start"}
          </button>
          <button
            className="btn btn-lg btn-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <ValidityChecker />
    </div>
  );
}
