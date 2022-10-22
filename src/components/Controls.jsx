import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_MODE, setEditMode } from "../reducers/boardSlice";
import "./Controls.css";

export default function Controls() {
  const editMode = useSelector((state) => state.board.editMode);
  const dispatch = useDispatch();
  const handleEditModeChange = (e) => dispatch(setEditMode(e.target.name));

  const RadioInput = ({radioEditMode, displayText}) => (
    <div className="form-check mode-input d-grid gap-2">
      <input 
        className="btn-check" 
        id={radioEditMode} 
        type="radio" 
        name={radioEditMode} 
        checked={editMode === radioEditMode} 
        onChange={handleEditModeChange} />
      <label className="btn btn-lg btn-outline-dark" htmlFor={radioEditMode}>{displayText}</label>
    </div>
  )

  const modeInputs = [
    { radioEditMode: EDIT_MODE.SOLUTION, displayText: 'Solution' },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CORNER, displayText: 'Corner Pencil Mark' },
    { radioEditMode: EDIT_MODE.PENCIL_MARK_CENTER, displayText: 'Center Pencil Mark' },
    { radioEditMode: EDIT_MODE.GIVEN, displayText: 'Given' },
  ]
  return (
    <div className="controls">
      <div className="mode">
        <div className="inputs">         
          {modeInputs.map(props => <RadioInput key={props.radioEditMode} {...props} />)}
        </div>
      </div>
    </div>
  );
}
