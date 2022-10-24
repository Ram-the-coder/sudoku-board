import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { assertCellHasSolutionMark } from '../testUtils/assertions';
import boardPage from '../testUtils/board.page';
import { firstCellCoords, pressKey, renderWithProviders, selectMode } from '../testUtils/testUtils';

describe('Solution mode', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display a solution mark', () => {
        selectMode(EDIT_MODE.SOLUTION)
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        assertCellHasSolutionMark(firstCellCoords, '1');
    })

    it('should be able to cycle to Solution Mode from Given mode', () => {
        pressKey('Control');
        boardPage.selectCell(firstCellCoords)
        pressKey('1');
        assertCellHasSolutionMark(firstCellCoords, '1');
    })

    it('should be able to cycle back to Solution Mode from Corner Pencil Mark mode', () => {
        pressKey('Control');
        pressKey('Control');
        pressKey('Shift');
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        assertCellHasSolutionMark(firstCellCoords, '1');
    })
})