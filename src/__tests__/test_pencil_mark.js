import { within } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { assertCellHasCenterPencilMarks, assertCellHasCornerPencilMarks, assertCellIsEmpty } from '../testUtils/assertions';
import boardPage from '../testUtils/board.page';
import { firstCellCoords, pressKey, renderWithProviders, selectMode } from '../testUtils/testUtils';

const pencilModes = [{
    mode: EDIT_MODE.PENCIL_MARK_CENTER,
    assertFunction: assertCellHasCenterPencilMarks
}, {
    mode: EDIT_MODE.PENCIL_MARK_CORNER,
    assertFunction: assertCellHasCornerPencilMarks
}]

pencilModes.forEach(({ mode, assertFunction }) => describe(`Pencil Mark ${mode} mode`, () => {
    beforeEach(() => {
        renderWithProviders(<App />);
        selectMode(mode);
    })

    it('should display pencil marks in sorted order', () => {
        boardPage.selectCell(firstCellCoords);
        const numbers = ['1', '3', '2'];
        numbers.forEach(n => pressKey(n));
        assertFunction(firstCellCoords, '123');
    })

    it('should remove pencil marks when entered again', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        pressKey('2')

        pressKey('2')
        assertFunction(firstCellCoords, '1')

        pressKey('1')
        assertCellIsEmpty(firstCellCoords)

        pressKey('1')
        assertFunction(firstCellCoords, '1')
    });

    ['Backspace', 'Delete'].forEach(key => it(`should remove pencil marks on pressing ${key}`, () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        pressKey('2')
        pressKey(key)
        assertCellIsEmpty(firstCellCoords);
    }))
}));

describe('Corner pencil mark', () => {
    beforeEach(() => {
        renderWithProviders(<App />);
        selectMode(EDIT_MODE.PENCIL_MARK_CORNER);
    })

    it('will not take more than 8 elements', () => {
        boardPage.selectCell(firstCellCoords);
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(n => pressKey(n));
        assertCellHasCornerPencilMarks(firstCellCoords, '12345678');
        pressKey('8');
        assertCellHasCornerPencilMarks(firstCellCoords, '1234567');
    })
})