import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Function Component
function Square(props) {
        return (
            <button className="square"
                    onClick={() => props.onClick()} >
                    {props.value}
            </button>
        );
}


// Class Component
class Board extends React.Component {

    // State Constructor
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true,
            turn: 0,
            status: null
        };
    }

    renderSquare(i) {
        return (<Square
            value = {this.state.squares[i]}
            onClick = {() => {this.handleClick(i)}}
            // How Child changes Parent:
            // Sending Parent function pointer to child inside Props, and then child can trigger it
        />);
    }

    render() {
        // let nextPlayer = this.state.isXNext? 'X' : 'O';
        let status = this.state.status;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    handleClick(i) {
        if(this.state.status != null)
            return;
        const newSquares = this.state.squares.slice();
        newSquares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({squares: newSquares});
        let turn = this.state.turn;
        this.setState({turn: turn++});
        this.checkStatus();
        this.setState({isXNext: !this.state.isXNext});
    }

    checkStatus() {
        let squares = this.state.squares.slice();
        let currPlayer = this.state.isXNext? 'X' : 'O';
        if(this.state.turn === 9)
            this.setState({status: 'Tie!'});
        else if(squares[0] === squares[1] === squares[2]
            || squares[3] === squares[4] === squares[5]
            || squares[6] === squares[7] === squares[8]
            || squares[0] === squares[3] === squares[6]
            || squares[1] === squares[4] === squares[7]
            || squares[2] === squares[5] === squares[8]
            || squares[0] === squares[4] === squares[8]
            || squares[2] === squares[4] === squares[6])
                this.setState({status: currPlayer+ ' Win!'});
        }
}



class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
