import {fireEvent, screen, within } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { pressKey, renderWithProviders, selectMode } from '../utils/testUtils';

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
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        const numbers = ['1', '2', '3']
        numbers.forEach(n => pressKey(n));
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isPencilMark).toEqual("true")
        expect(cell.textContent).toEqual('123')
        numbers.forEach(n => {
            expect(within(cell).getByText(n)
                .dataset[modeType.dataElement]).toEqual("true")
        })
    })

    it('should remove pencil marks when entered again', () => {
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey('1');
        pressKey('2')

        pressKey('2')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('1')

        pressKey('1')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('')

        pressKey('1')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('1')
    });

    ['Backspace', 'Delete'].forEach(key => it(`should remove pencil marks on pressing ${key}`, () => {
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey('1');
        pressKey('2')
        pressKey(key)
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('')
    }))
}));

describe('Corner pencil mark', () => {
    beforeEach(() => {
        renderWithProviders(<App />);
        selectMode('Corner Pencil Mark', EDIT_MODE.PENCIL_MARK_CORNER);
    })

    it('will not take more than 8 elements', () => {
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(n => pressKey(n));
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('12345678');
        pressKey('8');
        expect(cell.textContent).toEqual('1234567');
    })
})