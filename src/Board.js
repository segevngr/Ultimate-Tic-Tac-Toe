import React, {useState} from 'react';
import './Board.css';

function Square(props) {
    return (
        <button className="square"
                style = {{backgroundColor : props.getColor}}
                onClick = {props.handleClick} >
                {props.value}
        </button>
    );
}

function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(0);

    function renderSquare(i) {
        return (
            <Square
                value = {squares[i]}
                handleClick = {() => {handleClick(i)}}
                getColor = {getColor()}
            />
        );
    }

    function handleClick(i) {
        if(!props.isPlayable(props.boardId))
            return;
        if(squares[i] != null)
            return;
        props.incSteps();
        let currPlayer = props.getPlayer()? 'X' : 'O';
        const newSquares = squares.slice();
        newSquares[i] = currPlayer;
        setSquares(newSquares);
        let currTurn = turn;
        setTurn(++currTurn);
        isWinOrTie(newSquares, currTurn, currPlayer, i);
        props.setNextPlayer();
    }

    function isWinOrTie(Squares, Turn, player, nextBoardId) {
        const winSquares = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let win = false;
        for (let i = 0; i < winSquares.length; i++) {
            const a = winSquares[i][0];
            const b = winSquares[i][1];
            const c = winSquares[i][2];
            if (Squares[a] != null && Squares[a] === Squares[b] && Squares[b] === Squares[c]) {
                win = true;
                props.handleBoardWin(player, nextBoardId);
            }
        }

        if(!win && Turn === 9)
            props.handleBoardTie(nextBoardId);
        else if(!win && Turn !== 9)
            props.updateBoardsStatus(props.boards, nextBoardId);
    }

    function getColor() {
        switch(props.board) {
            case "play":
                return "green";
            case "X":
                return "red";
            case "O":
                return "blue";
            case "tie":
                return "grey";
            default:
                return "white";
        }
    }

    return (
            <div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        );
}

export default Board;