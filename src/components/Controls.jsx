import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT_MODE, setEditMode } from '../reducers/boardSlice';

export default function Controls() {
    const editMode = useSelector(state => state.board.editMode);
    const dispatch = useDispatch();
    const handleEditModeChange = (e) => dispatch(setEditMode(e.target.value))
    return (
        <select 
            name="mode" 
            id="mode" 
            className="form-select" 
            aria-label="select mode" 
            data-testid="mode-selector" 
            value={editMode} 
            onChange={handleEditModeChange}>
            <option value={EDIT_MODE.SOLUTION}>Solution</option>
            <option value={EDIT_MODE.PENCIL_MARK}>Pencil Mark</option>
            <option value={EDIT_MODE.GIVEN}>Given</option>
        </select>
    )
}