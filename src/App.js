// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import Home from './containers/home';

import logo from './logo.svg';
import './App.css';



class App extends Component<{}> {

  render(): Node {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Home />
      </div>
    );
  }
}

export default App;

