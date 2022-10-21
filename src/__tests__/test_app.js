import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import App from '../App';
import { renderWithProviders } from '../utils/testUtils';


describe('Sudoku Board App', () => {
    describe('basic', () => {
        it('renders a 9x9 board', async () => {
            renderWithProviders(<App />);
            for(let i=0; i<9; i++) {
                for(let j=0; j<9; j++) {
                    const cell = screen.getByTestId(`cell-${i}-${j}`)
                    expect(cell.textContent).toEqual('');
                }
            }
        })
    })

    describe('selection', () => {
        it('should select the cell on click', () => {
            renderWithProviders(<App />);
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.dataset.isSelected).toEqual("true");
        })

        it('should de-select the cell on clicking a selected cell', () => {
            renderWithProviders(<App />);
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            fireEvent.click(cell)
            cell = screen.getByTestId('cell-0-0');
            expect(cell.dataset.isSelected).toEqual("false");
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

    describe('Givens', () => {
        it('renders the givens as specified', async () => {
            renderWithProviders(<App />, {
                preloadedState: {
                    board: {
                        cells: Array(9).fill(0).map( _ => Array(9).fill({ given: 1 }) )
                    }
                }
            });
            const cell = screen.getByTestId('cell-0-0')
            expect(cell.textContent).toEqual('1')
        })
    
        it('On pressing 1 it should set it as a given', async () => {
            renderWithProviders(<App />);
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            fireEvent.keyDown(cell, { key: '1'})
            fireEvent.keyUp(cell, { key: '1'})
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('1');      
        })
    
        it('One pressing 1 again it should remove it as a given', async () => {
            renderWithProviders(<App />);
            let cell = screen.getByTestId('cell-0-0');
            fireEvent.click(cell)
            fireEvent.keyDown(document, { key: '1'})
            fireEvent.keyUp(document, { key: '1'})
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('1');    
            fireEvent.keyDown(cell, { key: '1'})
            fireEvent.keyUp(cell, { key: '1'})
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('');
        })
    
        it('should not set non numbers', async () => {
            renderWithProviders(<App />);
            let cell = screen.getByTestId('cell-0-0');     
            fireEvent.click(cell)
            fireEvent.keyDown(document, { key: 'a'})
            fireEvent.keyUp(document, { key: 'a'})
            cell = screen.getByTestId('cell-0-0');
            expect(cell.textContent).toEqual('');
        })
    })
    

    
})