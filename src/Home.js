import { Link } from "react-router-dom";
import React, {useState} from 'react';
import "./Home.css";


function Home() {
    const [xName, setXName] = useState('');
    const [oName, setOName] = useState('');

    return (
        <div>
            <p className="enter">Choose your shape:</p>
            <table className="table">
                <tbody>
                <tr>
                    <td className="x">X</td>
                    <td className="space"> </td>
                    <td className ="o">O</td>
                </tr>
                <tr>
                    <td><input type = "text" className="input" onChange={event => setXName(event.target.value)}/></td>
                    <td className="space"> </td>
                    <td><input type = "text" className="input" onChange={event => setOName(event.target.value)}/></td>
                </tr>
                </tbody>
            </table>
                <div>
                    <Link className="start" to="/game">
                        Start!
                    </Link>
                </div>


        </div>
    );
}

export default Home;