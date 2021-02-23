import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import App from './components/App';
import Peoples from './components/Peoples';
import Films from './components/Films';
import Planets from './components/Planets';
import Starships from './components/Starships';
import Vehicles from './components/Vehicles';

const html = (
    <Router>
        <div className="main-navbar">
            <Button variant="light" className="btn-navbar">
                <Link to='/peoples' className="link-navbar">Peoples</Link>
            </Button>
            <Button variant="light" className="btn-navbar">
                <Link to='/films' className="link-navbar">Films</Link>
            </Button>
            <Button variant="light" className="btn-navbar">
                <Link to='/planets' className="link-navbar">Planets</Link>
            </Button>
            <Button variant="light" className="btn-navbar">
                <Link to='/starships' className="link-navbar">Starships</Link>
            </Button>
            <Button variant="light" className="btn-navbar">
                <Link to='/vehicles' className="link-navbar">Vehicles</Link>
            </Button>
        </div>

        <Route path='/' exact component={App}></Route>
        <Route path='/peoples' exact component={Peoples}></Route>
        <Route path='/films' exact component={Films}></Route>
        <Route path='/planets' exact component={Planets}></Route>
        <Route path='/starships' exact component={Starships}></Route>
        <Route path='/vehicles' exact component={Vehicles}></Route>
    </Router>
)
ReactDOM.render(html, document.getElementById('root'))