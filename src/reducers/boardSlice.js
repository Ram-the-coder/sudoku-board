import { createSlice } from '@reduxjs/toolkit'

export const EDIT_MODE = {
    GIVEN: 'Given',
    SOLUTION: 'Solution',
    PENCIL_MARK_CENTER: 'Center Pencil Mark',
    PENCIL_MARK_CORNER: 'Corner Pencil Mark',
}

const intialCells = Array(9).fill(0).map(i => Array(9).fill({
    given: null,
    solutionMark: null,
    pencilMarks: {
        center: [],
        corners: [],
    },
}))

const initialState = {
    cells: intialCells,
    selected: null,
    editMode: EDIT_MODE.GIVEN,
    isStarted: false,
};

export const boardSlice  = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setSelected: (state, { payload }) => {
            const { row, col } = payload;
            state.selected = { row, col };
        },
        clearSelectedCell: (state) => {
            const currentSelected = state.selected;
            if (!currentSelected) return;
            const { row, col } = currentSelected;
            if (!state.isStarted) state.cells[row][col].given = null
            state.cells[row][col].solutionMark = null
            state.cells[row][col].pencilMarks = {
                center: [],
                corners: [],
            }
        },
        handleKeyPress: (state, { payload }) => {
            const keyPressed = parseInt(payload);
            if (!state.selected || !keyPressed) return;
            const { row, col } = state.selected;
            const { editMode } = state;
            if (editMode === EDIT_MODE.GIVEN) {
                const currentGiven = state.cells[row][col].given;
                state.cells[row][col].given = currentGiven === keyPressed ? null : keyPressed;
            } else if (editMode === EDIT_MODE.SOLUTION) {
                const currentValue = state.cells[row][col].solutionMark;
                state.cells[row][col].solutionMark = currentValue === keyPressed ? null : keyPressed;
            } else if (editMode === EDIT_MODE.PENCIL_MARK_CENTER) {
                const currentValue = state.cells[row][col].pencilMarks.center;
                state.cells[row][col].pencilMarks.center = currentValue.indexOf(keyPressed) !== -1 
                    ? currentValue.filter(pm => pm !== keyPressed) 
                    : [...currentValue, keyPressed].sort()
            } else if (editMode === EDIT_MODE.PENCIL_MARK_CORNER) {
                const currentValue = state.cells[row][col].pencilMarks.corners;
                state.cells[row][col].pencilMarks.corners = currentValue.indexOf(keyPressed) !== -1 
                    ? currentValue.filter(pm => pm !== keyPressed) 
                    : [...currentValue, keyPressed].slice(0, 8).sort()
            }
        },
        setEditMode: (state, { payload }) => {
            state.editMode = payload;
        },
        setStarted: (state, { payload }) => {
            state.isStarted = payload;
            state.editMode = EDIT_MODE.SOLUTION;
        },
        resetState: () => initialState
    }
})

export const { clearSelectedCell, resetState, setEditMode, setSelected, setStarted, handleKeyPress } = boardSlice.actions;

export default boardSlice.reducer;