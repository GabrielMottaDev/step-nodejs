import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class Contato extends Component {
    render() {
        return (
            <div>
                <Header/>
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Contato Page</h2>
                <Footer/>
            </div>
        );
    }
}

export default Contato;