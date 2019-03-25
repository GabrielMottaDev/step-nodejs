import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class Sobre extends Component {
    render() {
        return (
            <div>
                <Header/>
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Sobre Page</h2>
                <Footer/>
            </div>
        );
    }
}

export default Sobre;
