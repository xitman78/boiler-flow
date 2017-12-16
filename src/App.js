// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import logo from './logo.svg';

import { connect } from 'react-redux';

import './App.css';

import { increment, decrement } from './actions';
import type { ActionType } from './actionTypes';
import type { IncState } from './storeTypes';


type Props = {
  red1: IncState,
  increment: () => ActionType,
  decrement: () => ActionType,
};

class App extends Component<Props> {

  render(): Node {

    console.log('', this.props.red1);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.props.red1.a}
        <hr />
        <button onClick={this.props.increment}>PLUS</button><button onClick={this.props.decrement}>MINUS</button>
      </div>
    );
  }
}

export default connect(state => ({red1: state.red1}), {
  increment: increment,
  decrement: decrement,
})(App);

