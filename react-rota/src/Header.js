import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <Link to="/">Home</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
            </header>
        );
    }
}

export default Header;
