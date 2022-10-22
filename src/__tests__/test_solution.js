import {fireEvent, screen } from '@testing-library/react'
import App from '../App';
import { EDIT_MODE } from '../reducers/boardSlice';
import { pressKey, renderWithProviders, selectMode } from '../utils/testUtils';

describe('Solution mode', () => {
    beforeEach(() => renderWithProviders(<App />))

    it('should display a solution mark', () => {
        selectMode('Solution', EDIT_MODE.SOLUTION)
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey('1');
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })

    it('should be able to cycle to Solution Mode from Given mode', () => {
        pressKey('Control');
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey('1');
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })

    it('should be able to cycle back to Solution Mode from Corner Pencil Mark mode', () => {
        pressKey('Control');
        pressKey('Control');
        pressKey('Shift');
        let cell = screen.getByTestId('cell-0-0')
        fireEvent.click(cell);
        pressKey('1');
        cell = screen.getByTestId('cell-0-0')
        expect(cell.dataset.isSolutionMark).toEqual("true")
    })
})