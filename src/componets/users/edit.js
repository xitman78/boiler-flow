import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUser} from "./actions";

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

import './list.css';

type Props = {
  user: ?User,
  getUser: () => ActionType,
};

class UserEdit extends Component<Props> {

  componentWillMount() {
    this.userId = this.props.match.params.id;
    this.props.getUser(this.userId);
  }

  render() {

    return <div className="users-list-container">
      {this.props.user && this.props.user.firstName}
      </div>;
  }

}


export default connect(
  state => ({
    user: state.users.editUser
  }),
  {
    getUser: getUser,
  })(UserEdit);
