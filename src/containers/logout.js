// @flow

import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {logoutAction} from "../actions/authActions";

class Logout extends PureComponent<{logoutAction: Function}> {

  componentWillMount() {
    this.props.logoutAction();
  }

  render() {
    return null
  }
}

export default connect(() => ({}), {logoutAction})(Logout);