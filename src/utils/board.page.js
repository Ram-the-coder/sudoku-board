import { fireEvent, screen } from "@testing-library/react";

class Board {
  getCell({ row, col }) {
    return screen.getByTestId(`cell-${row}-${col}`);
  }
  selectCell(cellCoords) {
    fireEvent.click(this.getCell(cellCoords));
  }
}

const boardPage = new Board();
export default boardPage;
