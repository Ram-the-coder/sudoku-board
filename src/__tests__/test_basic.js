import App from '../App';
import { assertCellIsEmpty } from '../testUtils/assertions';
import { renderWithProviders } from '../testUtils/testUtils';

describe('basic', () => {
    it('renders a 9x9 board', async () => {
        renderWithProviders(<App />);
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                assertCellIsEmpty({ row: i, col: j })
            }
        }
    })
})