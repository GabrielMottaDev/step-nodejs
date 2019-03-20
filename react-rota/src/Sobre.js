import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class Sobre extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Testando ROTAS
                     </p>
                    <p className="App-intro">
                        <Link to="/">Ir para o home</Link>
                    </p>
                </header>
            </div>
        );
    }
}

export default Sobre;
