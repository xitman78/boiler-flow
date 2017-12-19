import React, {PureComponent} from "react";
import {connect} from "react-redux";
// import {Link} from "react-router-dom";

import { Form, Field } from 'react-final-form';
import {loginRequest} from "./actions";
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import TextFieldAdapter from '../form/textFieldAdapter';
import {validateRequired} from '../../helpers/validators';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    marginTop: theme.spacing.unit * 3,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 400,
  }),
  container: {
    display: 'block',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
    marginTop: 16,
    marginRight: 16,
  },
});



class LoginForm extends PureComponent<{}> {

  onSubmit = values => {
    this.props.loginRequest(values.email, values.password, "dfsdgsdfgsdfgsdfgsdfgdfsgsgfd");
  };

  render() {

    const { classes } = this.props;

    return <div className="users-list-container">

      {<Form
          onSubmit={this.onSubmit}
          initialValues={{
            username: '',
            password: '',
          }}
          render={({ handleSubmit, reset, submitting, pristine, values }) => {
            return <Paper className={classes.root} elevation={4}>
              <Icon color="primary" style={{ fontSize: 50 }}>local_florist</Icon>
              <Typography type="headline" component="h3" color={'primary'}>
                Sign-In
              </Typography>
              <form onSubmit={handleSubmit} className={classes.container}>
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
                    className={classes.textField}
                    required
                    type="password"
                    validate={validateRequired}
                    name="password"
                    component={TextFieldAdapter}
                    label="Password"
                    margin="normal"
                  />
                </div>
                <Button className={classes.button} raised color="primary" type="submit" disabled={submitting || pristine}>
                  Login
                </Button>
              </form>
            </Paper>}} />
      }
      </div>;
  }

}

export default connect(
  state => ({}),
  {
    loginRequest,
  })(withStyles(styles)(LoginForm));



