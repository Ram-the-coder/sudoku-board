import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setSelected } from "../reducers/boardSlice";
import './board.css'
import PencilMarks from "./PencilMarks";

function Given(props) {
    const { cell: { given }, className='', ...rest} = props;
    return <div {...rest} className={`given ${className}`} data-is-given>{given}</div>
}

function SolutionMark(props) {
    const { cell: { solutionMark }, className='', ...rest} = props;
    return <div {...rest} className={`solution-mark ${className}`} data-is-solution-mark>{solutionMark}</div>
}

function Cell({row, col}) {
    const board = useSelector(state => state.board)
    const dispatch = useDispatch();
    const { given, solutionMark, pencilMarks } = board.cells[row][col];
    const { selected } = board;
    const handleClick = () => dispatch(setSelected({ row, col }))
    const isSelected = Boolean(selected && selected.row === row && selected.col === col);
    const props = {
        className: `cell ${isSelected ? 'selected' : ''}`,
        'data-testid': `cell-${row}-${col}`,
        'data-is-selected': isSelected,
        cell: board.cells[row][col],
        onClick: handleClick
    }
    if (given) return (
        <Given {...props} />
    )

    if(solutionMark) return (
        <SolutionMark {...props} />
    )

    if(pencilMarks.center.length > 0 || pencilMarks.corners.length > 0) return (
        <PencilMarks {...props} />
    )
    return <div {...props}>{''}</div>
}

export default function SudokuBoard(props) {
    
    const rows = []
    for(let i=0; i<9; i++) {
        const cells = []
        for(let j=0; j<9; j++) {
            cells.push(<Cell key={`${i}-${j}`} row={i} col={j} />);
        }
        rows.push(
            <div className="row" key={i}>{cells}</div>
        )
    }

    
    return (
        <div className="board">
            {rows}
        </div>
    );
}