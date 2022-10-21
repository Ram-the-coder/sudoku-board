import { screen } from '@testing-library/react'
import App from '../App';
import { renderWithProviders } from '../utils/testUtils';

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