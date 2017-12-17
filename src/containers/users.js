// @flow

import React, {Component} from "react";
import UsersList from '../componets/users/list';

class Users extends Component<{}> {

  render() {
    return <div>
      <h3>Users</h3>
      <UsersList />
    </div>;
  }
}

export default Users;