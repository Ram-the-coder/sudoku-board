import {fireEvent, screen } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { pressKey, renderWithProviders } from '../utils/testUtils';

describe('Solution mode', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display a solution mark', () => {
        const modeSelector = screen.getByTestId('mode-selector');
        fireEvent.change(modeSelector, { target: { value: EDIT_MODE.SOLUTION }});
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey(document, '1');
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })
})