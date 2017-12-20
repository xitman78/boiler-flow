// @flow

import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {logoutAction} from "../componets/loginForm/actions";

class Logout extends PureComponent<{}> {

  componentWillMount() {
    this.props.logoutAction();
  }

  render() {
    return null
  }
}

export default connect(() => ({}), {logoutAction})(Logout);