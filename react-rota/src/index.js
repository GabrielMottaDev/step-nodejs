import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Sobre from './Sobre';
import Contato from './Contato';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

var routes =
    <BrowserRouter>
        <Switch>
            <Route path="/" exact="{true}" component={App} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/contato" component={Contato} />
        </Switch>
    </BrowserRouter>;

ReactDOM.render(routes, document.getElementById("content"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
