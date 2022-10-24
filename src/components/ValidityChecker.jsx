import { useSelector } from "react-redux";

const getCellValues = cells => cells.map(cell => cell.given || cell.solutionMark).filter(v => v);
const doesTheArrayHaveDuplicates = arr => (new Set(arr)).size === arr.length;
const doTheCellsHaveDuplicates = cells => doesTheArrayHaveDuplicates(getCellValues(cells));

function isRowValid(cells, row) {
    return doTheCellsHaveDuplicates(cells[row]);
}

function isColumnValid(cells, col) {
    const cellsInCol = []
    for(let i=0; i<9; i++) cellsInCol.push(cells[i][col]);
    return doTheCellsHaveDuplicates(cellsInCol);
}

function isBlockValid(cells, blockNum) {
    const cellsInBlock = []
    const rowStart = Math.floor(blockNum / 3) * 3;
    const colStart = (blockNum % 3) * 3;
    for(let i=rowStart; i<(rowStart + 3); i++) {
        for(let j=colStart; j<(colStart + 3); j++) {
            cellsInBlock.push(cells[i][j])
        }
    }
    return doTheCellsHaveDuplicates(cellsInBlock);
}

function isSudokuValid(cells) {
    for (let i=0; i<9; i++) {
        if (!isRowValid(cells, i)) return false;
        if (!isColumnValid(cells, i)) return false;
        if (!isBlockValid(cells, i)) return false;
    }
    return true;
}

export default function ValidityChecker() {
    const cells = useSelector(state => state.board.cells);
    return (
        <div className="validity">
            {isSudokuValid(cells) ? null : <div className="error">Error</div>}
        </div>
    )
}