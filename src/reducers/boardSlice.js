import { createSlice } from '@reduxjs/toolkit'

const intialCells = Array(9).fill(0).map(i => Array(9).fill({
    given: null
}))

export const boardSlice  = createSlice({
    name: 'board',
    initialState: {
        cells: intialCells,
        selected: null
    },
    reducers: {
        setSelected: (state, { payload }) => {
            const { row, col } = payload;
            const currentSelected = state.selected;
            if (currentSelected && currentSelected.row === row && currentSelected.col === col)
                state.selected = null;
            else
                state.selected = { row, col };
        },
        handleKeyPress: (state, { payload }) => {
            const keyPressed = parseInt(payload);
            if (!state.selected || !keyPressed) return;
            const { row, col } = state.selected;
            const currentGiven = state.cells[row][col].given;
            state.cells[row][col].given = currentGiven === keyPressed ? null : keyPressed;
        }
    }
})

export const { setSelected, handleKeyPress } = boardSlice.actions;

export default boardSlice.reducer;