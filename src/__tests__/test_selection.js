import App from "../App";
import boardPage from "../testUtils/board.page";
import { coordsString, firstCellCoords, pressKey, renderWithProviders } from "../testUtils/testUtils";
import { assertCellIsSelected } from "../testUtils/assertions";

describe("selection", () => {
  describe("basic selection", () => {
    beforeEach(() => renderWithProviders(<App />));

    it("should select the cell on click", () => {
      boardPage.selectCell(firstCellCoords);
      assertCellIsSelected(firstCellCoords);
    });
  });

  describe("moving selection", () => {
    beforeEach(() => renderWithProviders(<App />));
    const testMoveSelection = ({ start, expectedEnd, key }) => {
      it(`test moves selection from ${coordsString(start)} to ${coordsString(expectedEnd)} on press of ${key}`, () => {
        boardPage.selectCell(start)
        pressKey(key);
        assertCellIsSelected(expectedEnd);
      });
    };

    const testCases = [
      { key: "a", start: { row: 0, col: 1 }, expectedEnd: { row: 0, col: 0 } },
      { key: "a", start: { row: 0, col: 0 }, expectedEnd: { row: 0, col: 8 } },
      { key: "ArrowLeft", start: { row: 0, col: 1 }, expectedEnd: { row: 0, col: 0 } },
      { key: "ArrowLeft", start: { row: 0, col: 0 }, expectedEnd: { row: 0, col: 8 } },
      { key: "d", start: { row: 0, col: 0 }, expectedEnd: { row: 0, col: 1 } },
      { key: "d", start: { row: 0, col: 8 }, expectedEnd: { row: 0, col: 0 } },
      { key: "ArrowRight", start: { row: 0, col: 0 }, expectedEnd: { row: 0, col: 1 } },
      { key: "ArrowRight", start: { row: 0, col: 8 }, expectedEnd: { row: 0, col: 0 } },
      { key: "w", start: { row: 1, col: 0 }, expectedEnd: { row: 0, col: 0 } },
      { key: "w", start: { row: 0, col: 0 }, expectedEnd: { row: 8, col: 0 } },
      { key: "ArrowUp", start: { row: 1, col: 0 }, expectedEnd: { row: 0, col: 0 } },
      { key: "ArrowUp", start: { row: 0, col: 0 }, expectedEnd: { row: 8, col: 0 } },
      { key: "s", start: { row: 0, col: 0 }, expectedEnd: { row: 1, col: 0 } },
      { key: "s", start: { row: 8, col: 0 }, expectedEnd: { row: 0, col: 0 } },
      { key: "ArrowDown", start: { row: 0, col: 0 }, expectedEnd: { row: 1, col: 0 } },
      { key: "ArrowDown", start: { row: 8, col: 0 }, expectedEnd: { row: 0, col: 0 } },
    ];

    testCases.forEach((tc) => testMoveSelection(tc));
  });
});
