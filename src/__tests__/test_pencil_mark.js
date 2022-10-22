import {fireEvent, screen, within } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { pressKey, renderWithProviders } from '../utils/testUtils';

const pencilModes = [{
    mode: EDIT_MODE.PENCIL_MARK_CENTER,
    dataElement: 'isPencilMarkCenter'
}, {
    mode: EDIT_MODE.PENCIL_MARK_CORNER,
    dataElement: 'isPencilMarkCorner'
}]

pencilModes.forEach(modeType => describe(`Pencil Mark ${modeType.mode} mode`, () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display pencil marks in sorted order', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: modeType.mode }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        const numbers = ['1', '2', '3']
        numbers.forEach(n => pressKey(document, n));
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isPencilMark).toEqual("true")
        expect(cell.textContent).toEqual('123')
        numbers.forEach(n => {
            expect(within(cell).getByText(n)
                .dataset[modeType.dataElement]).toEqual("true")
        })
    })

    it('should remove pencil marks when entered again', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: modeType.mode }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey(document, '1');
        pressKey(document, '2')

        pressKey(document, '2')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('1')

        pressKey(document, '1')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('')

        pressKey(document, '1')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('1')
    });

    ['Backspace', 'Delete'].forEach(key => it(`should remove pencil marks on pressing ${key}`, () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: modeType.mode }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey(document, '1');
        pressKey(document, '2')
        pressKey(document, key)
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('')
    }))
}));

describe('Corner pencil mark', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('will not take more than 8 elements', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: EDIT_MODE.PENCIL_MARK_CORNER }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(n => pressKey(document, n));
        cell = screen.getByTestId('cell-0-0')
        expect(cell.textContent).toEqual('12345678');
        pressKey(document, '8');
        expect(cell.textContent).toEqual('1234567');
    })
})