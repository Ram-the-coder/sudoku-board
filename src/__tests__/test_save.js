import { fireEvent, screen } from "@testing-library/react";
import { default as App } from "../App";
import { EDIT_MODE } from "../reducers/boardSlice";
import { getStateFromLocalStorage } from "../store";
import { assertCellHasCenterPencilMarks, assertCellHasCornerPencilMarks, assertCellHasGiven, assertCellHasSolutionMark, assertCellIsEmpty, assertCellIsSelected } from "../testUtils/assertions";
import boardPage from "../testUtils/board.page";
import { firstCellCoords, pressKey, renderWithProviders, selectMode } from "../testUtils/testUtils";

describe('Save the game', () => {
    let unmountComponent = null;
    beforeEach(() => {
        const { unmount } = renderWithProviders(<App />);
        unmountComponent = unmount;
    });

    const testCases = [{ 
        caseName: 'on render', 
        act: () => {},
        assertState: () => {
            for(let i=0; i<9; i++) {
                for(let j=0; j<9; j++) {
                    assertCellIsEmpty({ row: i, col: j })
                }
            }
        }
    }, {
        caseName: 'on selection of a cell',
        act: () => boardPage.selectCell(firstCellCoords),
        assertState: () => assertCellIsSelected(firstCellCoords)
    }, {
        caseName: 'on setting a given',
        act: () => {
            boardPage.selectCell(firstCellCoords);
            pressKey('1');
        },
        assertState: () => assertCellHasGiven(firstCellCoords, '1')
    }, {
        caseName: 'on marking a solution',
        act: () => {
            selectMode(EDIT_MODE.SOLUTION);
            boardPage.selectCell(firstCellCoords);
            pressKey('1');
        },
        assertState: () => assertCellHasSolutionMark(firstCellCoords, '1')
    }, {
        caseName: 'on center pencil mark',
        act: () => {
            selectMode(EDIT_MODE.PENCIL_MARK_CENTER);
            boardPage.selectCell(firstCellCoords);
            pressKey('1');
        },
        assertState: () => assertCellHasCenterPencilMarks(firstCellCoords, '1')
    }, {
        caseName: 'on corner pencil mark',
        act: () => {
            selectMode(EDIT_MODE.PENCIL_MARK_CORNER);
            boardPage.selectCell(firstCellCoords);
            pressKey('1');
        },
        assertState: () => assertCellHasCornerPencilMarks(firstCellCoords, '1')
    }, {
        caseName: 'on game start',
        act: () => {
            fireEvent.click(screen.getByText("Start"));
        },
        assertState: () => expect(screen.getByText('Started')).toBeTruthy()
    }];

    testCases.forEach(({ caseName, act, assertState }) => it(caseName, () => {
        act();
        unmountComponent();
        renderWithProviders(<App />, { preloadedState: getStateFromLocalStorage() })
        assertState();
    }))
})

describe('reset', () => {
    beforeEach(() => renderWithProviders(<App />));
    it('on declining reset, should do nothing', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        assertCellHasGiven(firstCellCoords, '1');
        const confirmMock = jest.fn();
        confirmMock.mockReturnValueOnce(false);
        global.confirm = confirmMock;
        fireEvent.click(screen.getByText('Reset'));
        expect(global.confirm.mock.calls).toHaveLength(1);
        assertCellHasGiven(firstCellCoords, '1');
    })

    it('on accepting reset, it should reset the state', () => {
        boardPage.selectCell(firstCellCoords);
        pressKey('1');
        assertCellHasGiven(firstCellCoords, '1');
        const confirmMock = jest.fn();
        confirmMock.mockReturnValueOnce(true);
        global.confirm = confirmMock;
        fireEvent.click(screen.getByText('Reset'));
        expect(global.confirm.mock.calls).toHaveLength(1);
        assertCellIsEmpty(firstCellCoords);
    })
})