// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import logo from './logo.svg';

import { connect } from 'react-redux';

import './App.css';

import type {State} from './Store';



type Props = {
  bar?: string,
  red1: State,
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
      </div>
    );
  }
}

export default connect(state => ({red1: state.red1}))(App);

