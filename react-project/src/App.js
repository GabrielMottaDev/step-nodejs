import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center><h1>HELLO WORLD</h1></center>
        </header>
        <div className="App-content">
          <img src="https://www.tesla.com/sites/default/files/images/software_update.jpg"></img>
        </div>
        <footer className="App-footer">
          <p>Attom © 2019. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;