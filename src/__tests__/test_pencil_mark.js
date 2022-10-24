import { within } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import boardPage from '../utils/board.page';
import { firstCellCoords, pressKey, renderWithProviders, selectMode } from '../utils/testUtils';

const pencilModes = [{
    modeText: 'Center Pencil Mark',
    mode: EDIT_MODE.PENCIL_MARK_CENTER,
    dataElement: 'isPencilMarkCenter'
}, {
    modeText: 'Corner Pencil Mark',
    mode: EDIT_MODE.PENCIL_MARK_CORNER,
    dataElement: 'isPencilMarkCorner'
}]

pencilModes.forEach(modeType => describe(`Pencil Mark ${modeType.mode} mode`, () => {
    beforeEach(() => {
        renderWithProviders(<App />);
        selectMode(modeType.modeText, modeType.mode);
    })

    it('should display pencil marks in sorted order', () => {
        boardPage.selectCell(firstCellCoords);
        const numbers = ['1', '3', '2'];
        numbers.forEach(n => pressKey(n));
        const cell = boardPage.getCell(firstCellCoords);
        expect(cell.dataset.isPencilMark).toEqual("true")
        expect(cell).toHaveTextContent('123')
        numbers.forEach(n => {
            expect(within(cell).getByText(n)
                .dataset[modeType.dataElement]).toEqual("true")
        })
    })

    it('should remove pencil marks when entered again', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        pressKey('2')

        pressKey('2')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1')

        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('')

        pressKey('1')
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1')
    });

    ['Backspace', 'Delete'].forEach(key => it(`should remove pencil marks on pressing ${key}`, () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        pressKey('2')
        pressKey(key)
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('')
    }))
}));

describe('Corner pencil mark', () => {
    beforeEach(() => {
        renderWithProviders(<App />);
        selectMode('Corner Pencil Mark', EDIT_MODE.PENCIL_MARK_CORNER);
    })

    it('will not take more than 8 elements', () => {
        boardPage.selectCell(firstCellCoords);
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(n => pressKey(n));
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('12345678')
        pressKey('8');
        expect(boardPage.getCell(firstCellCoords)).toHaveTextContent('1234567')
    })
})