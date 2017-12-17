import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getUser} from "./actions";

import FormInput from '../form/input';

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

import './list.css';

type Props = {
  user: ?User,
  getUser: () => ActionType,
};

class UserEdit extends Component<Props, {}> {

  componentWillMount() {

    this.setState({});

    this.userId = this.props.match.params.id;
    this.props.getUser(this.userId);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.user) {
      this.setState({user: Object.assign({}, nextProps.user)});
    }
  }

  onInputChange = (value: string, property: string) => {
    let user = Object.assign({}, this.state.user);
    user[property] = value;
    this.setState({user: user});
  };

  render() {

    return <div className="users-list-container">
      {this.state.user && <div>
          <FormInput label="First name:" value={this.state.user.firstName} property="firstName" onChange={this.onInputChange} />
          <FormInput label="Last name:" value={this.state.user.lastName} property="lastName" onChange={this.onInputChange} />
          <FormInput label="E-mail:" value={this.state.user.email} property="email" onChange={this.onInputChange} />
        </div>
      }
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
