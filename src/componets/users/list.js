import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUsers} from "../../actions/usersActions";

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

import './list.css';

type Props = {
  users: UsersState,
  getUser: () => ActionType,
};

class UsersList extends Component<Props> {

  componentWillMount() {
    this.props.getUsers();
  }

  render() {

    return <div className="users-list-container">
      {this.props.users.list.map((user: User) => <div key={user._id}><Link to={`/users/${user._id}`}>{`${user.firstName} ${user.lastName}`}</Link></div>)}
      </div>;
  }

}


export default connect(
  state => ({
    users: state.users
  }),
  {
    getUsers: getUsers,
  })(UsersList);
