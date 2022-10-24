import { within } from "@testing-library/react";
import boardPage from "./board.page";

export const assertCellIsSelected = (cellCoords) => {
    const cell = boardPage.getCell(cellCoords);
    expect(cell.dataset.isSelected).toEqual("true");
}

export const assertCellHasGiven = (cellCoords, given) => {
    const cell = boardPage.getCell(cellCoords);
    expect(cell.dataset.isGiven).toEqual("true");
    expect(cell).toHaveTextContent(given);
}

export const assertCellIsEmpty = (cellCoords) => {
    expect(boardPage.getCell(cellCoords)).toBeEmptyDOMElement();
}

export const assertCellHasCenterPencilMarks = (cellCoords, pencilMarks) => {
    const cell = boardPage.getCell(cellCoords);
    expect(cell.dataset.isPencilMark).toEqual("true");
    expect(cell).toHaveTextContent(pencilMarks);
    pencilMarks.split('').forEach(number => expect(
        within(cell).getByText(number).dataset.isPencilMarkCenter
    ).toEqual("true"))
}

export const assertCellHasCornerPencilMarks = (cellCoords, pencilMarks) => {
    const cell = boardPage.getCell(cellCoords);
    expect(cell.dataset.isPencilMark).toEqual("true");
    expect(cell).toHaveTextContent(pencilMarks);
    pencilMarks.split('').forEach(number => expect(
        within(cell).getByText(number).dataset.isPencilMarkCorner
    ).toEqual("true"))
}

export const assertCellHasSolutionMark = (cellCoords, solutionValue) => {
    const cell = boardPage.getCell(cellCoords);
    expect(cell.dataset.isSolutionMark).toEqual("true");
    expect(cell).toHaveTextContent(solutionValue);
}