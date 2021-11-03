import React, {useState} from 'react';
import './Board.css';

function Square(props) {
    return (
        <button className="square"
                onClick={() => props.handleClick()} >
                {props.value}
        </button>
    );
}

function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(0);
    const [status, setStatus] = useState(null);

    function renderSquare(i) {
        return (
            <Square
                value = {squares[i]}
                handleClick = {() => {handleClick(i)}}
                // How Child changes Parent:
                // Send Parent-Function pointer to child inside Props, and then child can trigger it
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
        checkStatus(newSquares, currTurn, currPlayer);
        props.setNextPlayer();
        props.updatePlayableBoards(i);
    }

    function checkStatus(Squares, Turn, player) {
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
        if(Turn === 9) {
            setStatus('Tie!');
            props.handleBoardTie();
        }
        else {
            for (let i = 0; i < winSquares.length; i++) {
                const a = winSquares[i][0];
                const b = winSquares[i][1];
                const c = winSquares[i][2];
                if (Squares[a] != null && Squares[a] === Squares[b] && Squares[b] === Squares[c]) {
                    setStatus(player + ' Won!')
                    props.handleBoardWin(player);
                    break;
                }
            }
        }

    }

    return (
            <div>
                <div className="status">{status}</div>
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