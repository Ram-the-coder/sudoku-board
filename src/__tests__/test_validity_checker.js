import { screen } from "@testing-library/react"
import App from "../App"
import boardPage from "../testUtils/board.page"
import { firstCellCoords, pressKey, renderWithProviders } from "../testUtils/testUtils"

describe('Validity Checker', () => {
    let unmount = null;
    beforeEach(() => {
        unmount = renderWithProviders(<App />).unmount;
    })
    it('does not show error message when there are no errors', () => {
        expect(screen.queryByText('Error')).not.toBeInTheDocument();
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        boardPage.selectCell({ row: 3, col: 1});
        pressKey('1');
        expect(screen.queryByText('Error')).not.toBeInTheDocument();
    })

    it('shows error message when same value in same row', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        boardPage.selectCell({ row: 0, col: 8});
        pressKey('1');
        expect(screen.getByText('Error')).toBeTruthy();
    })

    it('shows error message when same value in same column', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        boardPage.selectCell({ row: 5, col: 0 });
        pressKey('1');
        expect(screen.getByText('Error')).toBeTruthy();
    })

    it('shows error message when same value in same block', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        boardPage.selectCell({ row: 1, col: 1 });
        pressKey('1');
        expect(screen.getByText('Error')).toBeTruthy();

        unmount();
        renderWithProviders(<App />);

        boardPage.selectCell({ row: 3, col: 3 });
        pressKey('1');
        boardPage.selectCell({ row: 4, col: 4 });
        pressKey('1');
        expect(screen.getByText('Error')).toBeTruthy();
    })
})