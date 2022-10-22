import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_MODE, setEditMode, setStarted } from "../reducers/boardSlice";
import "./Controls.css";

export default function Controls() {
  const editMode = useSelector((state) => state.board.editMode);
  const isStarted = useSelector(state => state.board.isStarted);
  const dispatch = useDispatch();
  const handleEditModeChange = (e) => dispatch(setEditMode(e.target.name));
  const handleStart = () => dispatch(setStarted(true));

  const RadioInput = ({radioEditMode, displayText, disabled}) => (
    <div className="form-check mode-input d-grid gap-2">
      <input 
        className="btn-check" 
        id={radioEditMode} 
        type="radio" 
        name={radioEditMode} 
        checked={editMode === radioEditMode} 
        onChange={handleEditModeChange}
        disabled={disabled}
        aria-disabled={disabled} />
      <label className="btn btn-lg btn-outline-dark" htmlFor={radioEditMode}>{displayText}</label>
    </div>
  )

  const modeInputs = [
    { radioEditMode: EDIT_MODE.SOLUTION, displayText: 'Solution' },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CORNER, displayText: 'Corner Pencil Mark' },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CENTER, displayText: 'Center Pencil Mark' },
    { radioEditMode: EDIT_MODE.GIVEN, displayText: 'Given', disabled: isStarted },
  ]
  return (
    <div className="controls">
      <div className="mode">
        <div className="inputs">         
          {modeInputs.map(props => <RadioInput key={props.radioEditMode} {...props} />)}
        </div>
        <div className="button-controls d-grid gap-2">
          <button className="btn btn-lg btn-success" disabled={isStarted} onClick={handleStart}>{isStarted ? 'Started' : 'Start'}</button>
        </div>
      </div>
    </div>
  );
}
