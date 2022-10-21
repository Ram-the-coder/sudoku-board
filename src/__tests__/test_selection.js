import {fireEvent, screen } from '@testing-library/react'
import App from '../App';
import { renderWithProviders } from '../utils/testUtils';

describe('selection', () => {
    describe('basic selection', () => {
        beforeEach(() => renderWithProviders(<App />))

        it('should select the cell on click', () => {    
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.dataset.isSelected).toEqual("true");
        })

        it('should de-select the cell on clicking a selected cell', () => {
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            fireEvent.click(cell)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.dataset.isSelected).toEqual("false");
        })
    })
    

    describe('moving selection', () => {
        beforeEach(() => renderWithProviders(<App />))

        const testMoveSelection = ({start, expectedEnd, key}) => {
            it(`test moves selection from ${start} to ${expectedEnd} on press of ${key}`, () => {
                let cell = screen.getByTestId(start);
                fireEvent.click(cell)
                fireEvent.keyDown(document, { key })
                cell = screen.getByTestId(expectedEnd);
                expect(cell.dataset.isSelected).toEqual("true");
            })
        }

        const testCases = [
            { key: 'a', start: 'cell-0-1', expectedEnd: 'cell-0-0' },
            { key: 'a', start: 'cell-0-0', expectedEnd: 'cell-0-8' },
            { key: 'ArrowLeft', start: 'cell-0-1', expectedEnd: 'cell-0-0' },
            { key: 'ArrowLeft', start: 'cell-0-0', expectedEnd: 'cell-0-8' },
            { key: 'd', start: 'cell-0-0', expectedEnd: 'cell-0-1' },
            { key: 'd', start: 'cell-0-8', expectedEnd: 'cell-0-0' },
            { key: 'ArrowRight', start: 'cell-0-0', expectedEnd: 'cell-0-1' },
            { key: 'ArrowRight', start: 'cell-0-8', expectedEnd: 'cell-0-0' },
            { key: 'w', start: 'cell-1-0', expectedEnd: 'cell-0-0' },
            { key: 'w', start: 'cell-0-0', expectedEnd: 'cell-8-0' },
            { key: 'ArrowUp', start: 'cell-1-0', expectedEnd: 'cell-0-0' },
            { key: 'ArrowUp', start: 'cell-0-0', expectedEnd: 'cell-8-0' },
            { key: 's', start: 'cell-0-0', expectedEnd: 'cell-1-0' },
            { key: 's', start: 'cell-8-0', expectedEnd: 'cell-0-0' },
            { key: 'ArrowDown', start: 'cell-0-0', expectedEnd: 'cell-1-0' },
            { key: 'ArrowDown', start: 'cell-8-0', expectedEnd: 'cell-0-0' },
        ]
        
        testCases.forEach(tc => testMoveSelection(tc))
    })
})