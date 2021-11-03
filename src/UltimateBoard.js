import React, {useState} from 'react';
import Board from './Board.js';
import './UltimateBoard.css';

function UltimateBoard() {

    // play, hold, X, O, Tie
    const [boards, setBoards] = useState(Array(9).fill("play"));
    const [winner, setWinner] = useState("Game is On!");
    const [isXNext, setNext] = useState(true);
    const [steps, setSteps] = useState(0);


    function renderBoard(boardId) {
        return (
            <Board
                boardId = {boardId}
                boards = {boards}
                board = {boards[boardId]}
                setNextPlayer = {setNextPlayer}
                getPlayer = {getPlayer}
                incSteps = {incSteps}
                isPlayable = {(i) => isPlayable(i)}
                handleBoardTie = {(nextBoardId) => {handleBoardTie(boardId, nextBoardId)}}
                handleBoardWin = {(player, nextBoardId) => {handleBoardWin(boardId, player, nextBoardId)}}
                updateBoardsStatus = {(newBoards, nextBoard) => updateBoardsStatus(newBoards, nextBoard)}
            />
        );
    }

    function incSteps() {
        let currSteps = steps;
        setSteps(++currSteps);
    }

    function getPlayer() {
        return isXNext;
    }

    function setNextPlayer() {
        setNext(!isXNext);
    }

    function handleBoardTie(boardId, nextBoardId) {
        const newBoards = boards.slice();
        newBoards[boardId] = 'tie';
        setBoards(newBoards);
        updateBoardsStatus(newBoards, nextBoardId)
    }

    function handleBoardWin(boardId, player, nextBoardId) {
        const newBoards = boards.slice();
        newBoards[boardId] = player;
        setBoards(newBoards);
        console.log("win:  " +newBoards);
        updateBoardsStatus(newBoards, nextBoardId)
        checkWinner(newBoards);
    }

    function checkWinner(Boards) {
        const winBoards = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winBoards.length; i++) {
            const a = winBoards[i][0];
            const b = winBoards[i][1];
            const c = winBoards[i][2];
            if (Boards[a] === 'X' && Boards[a] === Boards[b] && Boards[b] === Boards[c]) {
                    setWinner("X Win!!!");
                    break;
            }
            if (Boards[a] === 'O' && Boards[a] === Boards[b] && Boards[b] === Boards[c]) {
                setWinner("O Win!!!");
                break;
            }
        }
    }

    function isPlayable (i) {
        return boards[i] === "play";
    }

    function updateBoardsStatus (Boards, nextBoardId) {
        console.log("update:  " +Boards);
        if(Boards[nextBoardId] === "play" || Boards[nextBoardId] === "hold"){
            for(let i = 0; i<Boards.length; i++) {
                if(Boards[i] === "play")
                    Boards[i] = "hold";
            }
            Boards[nextBoardId] = "play";
        }
        if(Boards[nextBoardId] === "X" || Boards[nextBoardId] === "O" || Boards[nextBoardId] === "tie") {
            for(let i = 0; i<Boards.length; i++) {
                if(Boards[i] === "hold")
                    Boards[i] = "play";
            }
        }
        setBoards(Boards);
    }

    return (
        <div>
        <h2 align = "center">{winner}</h2>
        <h3 align = "center">Next move: {isXNext? "X" : "O"}</h3>
        <h3 align = "center">Steps: {steps}</h3>
        <div className="ultimate-grid">
            <div className = "board" id="0"> {renderBoard(0)} </div>
            <div className = "board" id="1"> {renderBoard(1)} </div>
            <div className = "board" id="2"> {renderBoard(2)} </div>
            <div className = "board" id="3"> {renderBoard(3)} </div>
            <div className = "board" id="4"> {renderBoard(4)} </div>
            <div className = "board" id="5"> {renderBoard(5)} </div>
            <div className = "board" id="6"> {renderBoard(6)} </div>
            <div className = "board" id="7"> {renderBoard(7)} </div>
            <div className = "board" id="8"> {renderBoard(8)} </div>
        </div>
        </div>
    );
}

export default UltimateBoard;