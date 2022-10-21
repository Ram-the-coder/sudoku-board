import {render, screen} from '@testing-library/react'
import App from '../App';


describe('Sudoku Board App', () => {
    it('renders a 9x9 board', async () => {
        render(<App />);
        const cells = await screen.findAllByTestId('cell')
        expect(cells.length).toEqual(9*9);
    })

    it('renders the fixed numbers as specified', async () => {
        render(<App />);
    })
})