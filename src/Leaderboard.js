import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import "./Leaderboard.css";

function Leaderboard() {
    const [scores, setScores] = useState([]);
    const {xName, oName} = useParams();

    useEffect(()=>{
        fetchScores();
    }, [])

    const listScores = scores.map((item) =>
        <tr>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
        </tr>);

    function fetchScores () {
        const keys = Object.keys(localStorage);
        let values = [];
        for(let i=0; i<keys.length; i++)
            values.push(localStorage.getItem(keys[i]));

        let tupleArray = [];
        for(let i=0; i<keys.length; i++)
            tupleArray.push([0, keys[i], values[i]]);
        tupleArray.sort(function (a, b) {
            return a[2] - b[2]
        });

        for(let i=0; i<tupleArray.length; i++)
            tupleArray[i][0] = i+1;

        setScores(tupleArray);
    }

    return (
        <div>
            <div className="leaderboard"> ~ Leaderboard ~ </div>
            <table className="lead-table">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Steps</th>
                    </tr>
                    {listScores}
                </tbody>
            </table>
            <div className="back-container"><Link to={"/game/" +xName +"/" +oName} className="back">Back</Link></div>
        </div>

    );
}

export default Leaderboard;