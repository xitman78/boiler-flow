// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import type {User} from '../../store/storeTypes';

const Menu = ({authUser}: {authUser: User}) => <p className="App-intro">
  <Link to="/">Home</Link>&nbsp;<Link to="/users">Users</Link>&nbsp;
  {authUser ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
</p>;

export default connect(
  state => ({
    authUser: state.auth.authUser,
  })
)(Menu);