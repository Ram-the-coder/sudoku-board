import App from '../App';
import boardPage from '../utils/board.page';
import { firstCellCoords, pressKey, renderWithProviders } from '../utils/testUtils';

describe('Givens', () => {
    beforeEach(() => renderWithProviders(<App />));

    it('On pressing 1 it should set it as a given', async () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1');
    })

    it('One pressing 1 again it should remove it as a given', async () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1');
        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('');
    })

    it('should not set non numbers', async () => {
        boardPage.selectCell(firstCellCoords)
        pressKey('j')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('');
        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1');
        pressKey('j')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1');
    });

    ['Delete', "Backspace"].forEach(key => {
        it(`on pressing ${key} should delete the set given`, () => {
            boardPage.selectCell(firstCellCoords)
            pressKey('1')
            pressKey(key)
            expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('');
        })
    
        it(`on pressing ${key} when a different cell is selected, it should not delete the given in the original cell`, () => {
            boardPage.selectCell(firstCellCoords)
            pressKey('1')
            boardPage.selectCell({ row: 1, col: 1 })
            pressKey(key)
            expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1');
        })
    })  
})