import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Home Page</h2>
        <Footer />
      </div>
    );
  }
}

export default App;
