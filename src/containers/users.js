// @flow

import React, {Component} from "react";
import {Route} from 'react-router-dom';
import UsersList from '../componets/users/list';
import UserEdit from '../componets/users/edit';

class Users extends Component<{}> {

  render() {
    return <div>
      <h3>Users</h3>
      <Route exact path="/users" component={UsersList}/>
      <Route exact path="/users/:id" component={UserEdit}/>
    </div>;
  }
}

export default Users;