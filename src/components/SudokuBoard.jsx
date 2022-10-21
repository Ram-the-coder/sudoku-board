import './board.css'

function Cell() {
    return <div className="cell" data-testid="cell"></div>
}

export default function SudokuBoard(props) {
    const rows = []
    for(let i=0; i<9; i++) {
        const cells = []
        for(let j=0; j<9; j++) {
            cells.push(<Cell key={`${i}-${j}`} row={i} col={j} />);
        }
        rows.push(
            <div className="row">{cells}</div>
        )
    }
    return (
        <div className="board">
            {rows}
        </div>
    );
}