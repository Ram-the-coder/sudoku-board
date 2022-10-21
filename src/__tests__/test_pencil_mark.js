import {fireEvent, screen } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { pressKey, renderWithProviders } from '../utils/testUtils';

describe('Pencil Mark Mode', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display pencil marks in sorted order', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: EDIT_MODE.PENCIL_MARK }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey(document, '1');
        pressKey(document, '3')
        pressKey(document, '2')
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isPencilMark).toEqual("true")
        expect(cell.textContent).toEqual('123')
    })
    it('should remove pencil marks', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: EDIT_MODE.PENCIL_MARK }});
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
    })
})