import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UltimateBoard from "./UltimateBoard";
import Leaderboard from "./Leaderboard";
import Home from "./Home";
import "./index.css";

function App() {
    return (
        <div>
            <div className="title">Ultimate TicTacToe</div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game/:xName/:oName" element={<UltimateBoard />} />
                    <Route path="/leaderboard/:xName/:oName" element={<Leaderboard />} />
                </Routes>
            </Router>
        </div>
    );
}

ReactDOM.render(
        <App />,
        document.getElementById('root')
);