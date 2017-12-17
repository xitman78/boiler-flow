// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import type { Node } from 'react';
import {Route, Router, Switch, Link} from 'react-router-dom';

import Home from './containers/home';
import logo from './logo.svg';
import './App.css';
import store, {history} from "./Store";



class App extends Component<{}> {

  render(): Node {

    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              <Link to="/">Home</Link>&nbsp;<Link to="/">Home</Link>
            </p>
            <Route exact path="/" component={Home}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

