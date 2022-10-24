import App from "../App";
import { assertCellHasGiven, assertCellIsEmpty } from "../testUtils/assertions";
import boardPage from "../testUtils/board.page";
import {
  firstCellCoords,
  pressKey,
  renderWithProviders,
} from "../testUtils/testUtils";

describe("Givens", () => {
  beforeEach(() => renderWithProviders(<App />));

  it("On pressing 1 it should set it as a given", async () => {
    boardPage.selectCell(firstCellCoords);
    pressKey("1");
    assertCellHasGiven(firstCellCoords, "1");
  });

  it("One pressing 1 again it should remove it as a given", async () => {
    boardPage.selectCell(firstCellCoords);
    pressKey("1");
    assertCellHasGiven(firstCellCoords, "1");
    pressKey("1");
    assertCellIsEmpty(firstCellCoords);
  });

  it("should not set non numbers", async () => {
    boardPage.selectCell(firstCellCoords);
    pressKey("j");
    assertCellIsEmpty(firstCellCoords);
    pressKey("1");
    assertCellHasGiven(firstCellCoords, "1");
    pressKey("j");
    assertCellHasGiven(firstCellCoords, "1");
  });

  ["Delete", "Backspace"].forEach((key) => {
    it(`on pressing ${key} should delete the set given`, () => {
      boardPage.selectCell(firstCellCoords);
      pressKey("1");
      pressKey(key);
      assertCellIsEmpty(firstCellCoords);
    });

    it(`on pressing ${key} when a different cell is selected, it should not delete the given in the original cell`, () => {
      boardPage.selectCell(firstCellCoords);
      pressKey("1");
      boardPage.selectCell({ row: 1, col: 1 });
      pressKey(key);
      assertCellHasGiven(firstCellCoords, "1");
    });
  });
});
