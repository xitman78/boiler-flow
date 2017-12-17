import React, {PureComponent} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";
import TextField from 'material-ui/TextField';
import { Form, Field } from 'react-final-form';
import {getUser, updateUser} from "./actions";
import Button from 'material-ui/Button';

//import FormInput from '../form/input';

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

import './list.css';

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
);

type Props = {
  user: ?User,
  getUser: () => ActionType,
};

class UserEdit extends PureComponent<Props> {

  componentWillMount() {

    this.userId = this.props.match.params.id;
    this.props.getUser(this.userId);
  }

  onSubmit = values => {
    console.log('Submit', values);
    this.props.updateUser(this.userId, values);
  };

  render() {

    return <div className="users-list-container">🏁
      {this.props.user &&
        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
          }}
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="firstName"
                  component={TextFieldAdapter}
                  type="text"
                  hintText="First Name"
                  floatingLabelText="First Name"
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  component={TextFieldAdapter}
                  hintText="Last Name"
                  floatingLabelText="Last Name"
                />
              </div>
              <div>
                <Field
                  name="email"
                  component={TextFieldAdapter}
                  hintText="First Name"
                  floatingLabelText="First Name"
                />
              </div>
              <Button raised color="primary" type="submit" disabled={submitting || pristine}>
                Submit
              </Button>
            </form>)} />
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
    updateUser: updateUser,
  })(UserEdit);


/* <FormInput label="First name:" value={this.state.user.firstName} property="firstName" onChange={this.onInputChange} />
          <FormInput label="Last name:" value={this.state.user.lastName} property="lastName" onChange={this.onInputChange} />
          <FormInput label="E-mail:" value={this.state.user.email} property="email" onChange={this.onInputChange} />*/



