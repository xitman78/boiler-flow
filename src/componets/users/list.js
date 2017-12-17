import React, {Component} from "react";
import {connect} from "react-redux";
import {getUsers} from "./actions";

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState} from "../../store/storeTypes";


type Props = {
  users: UsersState,
  getUser: () => ActionType,
};

class UsersList extends Component<Props> {


  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.props.users);

    return <div>{
      this.props.users.list.map(user => <div key={user.id}>{user.name}</div>)
    }</div>;
  }

}


export default connect(
  state => ({
    users: state.users
  }),
  {
    getUsers: getUsers,
  })(UsersList);
