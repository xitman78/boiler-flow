// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import type { Node } from 'react';
import {Route, Router, Switch, Link} from 'react-router-dom';
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';
import withRoot from './componets/withRoot';

import Home from './containers/home';
import Users from './containers/users';
import Login from './containers/login';
import logo from './logo.svg';
import './App.css';
import store, {history} from "./store/Store";

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};


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
              <Link to="/">Home</Link>&nbsp;<Link to="/users">Users</Link>&nbsp;<Link to="/login">Login</Link>
            </p>
            <Route exact path="/" component={Home}/>
            <Route path="/users" component={Users}/>
            <Route path="/login" component={Login}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withRoot(withStyles(styles)(App));

