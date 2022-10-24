import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import boardPage from '../utils/board.page';
import { firstCellCoords, pressKey, renderWithProviders, selectMode } from '../utils/testUtils';

describe('Solution mode', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display a solution mark', () => {
        selectMode('Solution', EDIT_MODE.SOLUTION)
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        const cell = boardPage.getCell(firstCellCoords);
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })

    it('should be able to cycle to Solution Mode from Given mode', () => {
        pressKey('Control');
        boardPage.selectCell(firstCellCoords)
        pressKey('1');
        const cell = boardPage.getCell(firstCellCoords);
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })

    it('should be able to cycle back to Solution Mode from Corner Pencil Mark mode', () => {
        pressKey('Control');
        pressKey('Control');
        pressKey('Shift');
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        const cell = boardPage.getCell(firstCellCoords);
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })
})