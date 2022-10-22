import {fireEvent, screen } from '@testing-library/react'
import App from '../App';
import { pressKey, renderWithProviders } from '../utils/testUtils';

describe('Givens', () => {
    beforeEach(() => renderWithProviders(<App />));

    it('On pressing 1 it should set it as a given', async () => {
        let cell = screen.getByTestId('cell-0-0');
        fireEvent.click(cell)
        pressKey('1', cell)
        cell = screen.getByTestId('cell-0-0');
        expect(cell.textContent).toEqual('1');      
    })

    it('One pressing 1 again it should remove it as a given', async () => {
        let cell = screen.getByTestId('cell-0-0');
        fireEvent.click(cell)
        pressKey('1')
        cell = screen.getByTestId('cell-0-0');
        expect(cell.textContent).toEqual('1');    
        pressKey('1', cell)
        cell = screen.getByTestId('cell-0-0');
        expect(cell.textContent).toEqual('');
    })

    it('should not set non numbers', async () => {
        let cell = screen.getByTestId('cell-0-0');     
        fireEvent.click(cell)
        pressKey('a')
        cell = screen.getByTestId('cell-0-0');
        expect(cell.textContent).toEqual('');
    });

    ['Delete', "Backspace"].forEach(key => {
        it(`on pressing ${key} should delete the set given`, () => {
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            pressKey('1')
            pressKey(key)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('');
        })
    
        it(`on pressing ${key} when a different cell is selected, it should not delete the given in the original cell`, () => {
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            pressKey('1')
            cell = screen.getByTestId('cell-1-1');
            fireEvent.click(cell)
            pressKey(key)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('1');
        })
    })
    
})