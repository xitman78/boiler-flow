// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


type Props = {
  bar?: string,
};

class App extends Component<Props> {

 /* test(a: string) {

  }*/

  render() {

   // this.test(55);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {`${process.env.TEST_ENV}`}
      </div>
    );
  }
}

export default App;
