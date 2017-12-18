import React, {PureComponent} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";
import TextField from 'material-ui/TextField';
import { Form, Field } from 'react-final-form';
import {getUser, updateUser} from "./actions";
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import MenuItem from 'material-ui/Menu/MenuItem';
import Icon from 'material-ui/Icon';
//import FormInput from '../form/input';

import type {ActionType} from "../../actions/actionTypes";
import type {UsersState, User} from "../../store/storeTypes";

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
const validateRequired = val => (val && val.trim().length > 0) ? undefined : 'Required';

const TextFieldAdapter = ({ input, meta, children, ...rest }) => {
  return <TextField
    {...input}
    {...rest}
    onChange={event => input.onChange(event.target.value)}
    { ... meta.invalid ? {helperText: meta.error, error: true} : {}} >
    {children}
  </TextField>
};

type Props = {
  user: ?User,
  getUser: () => ActionType,
};

class UserEdit extends PureComponent<Props> {

  constructor() {
    super();
    this.state = {name: 'Hello World!'};
  }

  componentWillMount() {

    this.userId = this.props.match.params.id;
    this.props.getUser(this.userId);
  }

  onSubmit = values => {
    this.props.updateUser(this.userId, values);
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
              <Icon color="primary" style={{ fontSize: 40 }}>account_box</Icon>
              <Typography type="headline" component="h3" color={'primary'}>
                Edit User
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
  })(withStyles(styles)(UserEdit));




