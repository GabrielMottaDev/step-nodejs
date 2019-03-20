import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center><h1>Formulario</h1></center>
        </header>
        <div className="App-content">
          <form class="form-horizontal">
            <fieldset>

              <legend>Registre-se</legend>

              <div class="form-group">
                <label class="col-md-4 control-label" for="nome">Nome:</label>
                <div class="col-md-4">
                  <input id="nome" name="nome" type="text" placeholder="" class="form-control input-md" />

                </div>
              </div>

              <div class="form-group">
                <label class="col-md-4 control-label" for="usuario">Usuario:</label>
                <div class="col-md-4">
                  <input id="usuario" name="usuario" type="text" placeholder="" class="form-control input-md" />

                </div>
              </div>

              <div class="form-group">
                <label class="col-md-4 control-label" for="senha">Senha:</label>
                <div class="col-md-4">
                  <input id="senha" name="senha" type="password" placeholder="" class="form-control input-md" />

                </div>
              </div>

              <div class="form-group">
                <label class="col-md-4 control-label" for="enviar"></label>
                <div class="col-md-4">
                  <button id="enviar" name="enviar" class="btn btn-primary">Registrar</button>
                </div>
              </div>

            </fieldset>
          </form>

        </div>
        <footer className="App-footer">
          <p>Attom © 2019. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;