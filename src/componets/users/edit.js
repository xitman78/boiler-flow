// @flow

import React, {Component} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";

import { Form, Field } from 'react-final-form';
import {getUser, updateUser, getNewUser, createUser} from "../../actions/usersActions";
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import MenuItem from 'material-ui/Menu/MenuItem';
import Icon from 'material-ui/Icon';
import TextFieldAdapter from '../form/textFieldAdapter';
import {validateRequired} from '../../helpers/validators';

import type {UsersActionType} from "../../actions/actionTypes";
import type {User} from '../../data-types/user';

import './list.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 700,
  }),
  container: {
    display: 'block',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  passField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginTop: 16,
    marginRight: 16,
  },
  menu: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


const genders = [
  {value: 'm', label: 'Male'},
  {value: 'f', label: 'Female'}
];


type Props = {
  user: ?User,
  getUser: (id: string) => UsersActionType,
  updateUser: (id: string, values: User) => UsersActionType,
  createUser: (values: User) => UsersActionType,
  getNewUser: () => UsersActionType,
  classes: {root: string, container: string, textField: string, button: string, menu: string, passField: string},
  match: {params: {id: string}},
};

class UserEdit extends Component<Props, {userId: string, isNew: boolean}> {

  componentWillMount() {
    if (this.props.match.params.id === 'new') {
      this.setState({userId: 'new', isNew: true});
      this.props.getNewUser();
    } else {
      this.setState({userId: this.props.match.params.id, isNew: false});
      this.props.getUser(this.props.match.params.id);
    }
  }

  onSubmit = values => {
    if (this.state.isNew) {
      this.props.createUser(values);
    } else {
      this.props.updateUser(this.state.userId, values);
    }
  };

  render() {

    const { classes } = this.props;

    return <div className="users-list-container">

      {this.props.user &&
        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            gender: this.props.user.gender,
          }}
          render={({ handleSubmit, reset, submitting, pristine, values }) => {
            return <Paper className={classes.root} elevation={4}>
              <Icon color="primary" style={{ fontSize: 50 }}>account_box</Icon>
              <Typography type="headline" component="h3" color={'primary'}>
                {this.state.isNew ? 'Create User' : 'Edit User'}
              </Typography>
              <form onSubmit={handleSubmit} className={classes.container}>
                <div>
                  <Field
                    className={classes.textField}
                    required
                    validate={validateRequired}
                    name="firstName"
                    component={TextFieldAdapter}
                    label="First Name"
                    margin="normal"
                  />
                </div>
                <div>
                  <Field
                    className={classes.textField}
                    required
                    validate={validateRequired}
                    name="lastName"
                    component={TextFieldAdapter}
                    label="Last Name"
                    margin="normal"
                  />
                </div>
                <div>
                  <Field
                    className={classes.textField}
                    required
                    validate={validateRequired}
                    name="email"
                    component={TextFieldAdapter}
                    label="E-mail"
                    margin="normal"
                  />
                </div>
                <div>
                  <Field
                    className={classes.menu}
                    required
                    select
                    component={TextFieldAdapter}
                    name="gender"
                    label="Gender"
                    margin="normal">
                    {genders.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                {this.state.isNew &&
                  [<div>
                    <Field
                      className={classes.passField}
                      required
                      type="password"
                      validate={validateRequired}
                      name="password"
                      component={TextFieldAdapter}
                      label="Password"
                      margin="normal"
                    />
                    <Field
                      className={classes.passField}
                      required
                      type="password"
                      validate={validateRequired}
                      name="confirmPassword"
                      component={TextFieldAdapter}
                      label="Confirm password"
                      margin="normal"
                    />
                  </div>,
                  ]
                }
                <Button className={classes.button} raised color="primary" type="submit" disabled={submitting || pristine}>
                  Submit
                </Button>
                <Button className={classes.button} raised color="accent" onClick={reset} disabled={submitting || pristine}>
                  Reset
                </Button>
              </form>
            </Paper>}} />
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
    getNewUser: getNewUser,
    createUser: createUser,
  })(withStyles(styles)(UserEdit));




