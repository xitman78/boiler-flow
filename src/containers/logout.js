// @flow

import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {logoutAction} from "../actions/authActions";

class Logout extends React.PureComponent<{logoutAction: Function}> {

  componentWillMount() {
    this.props.logoutAction();
  }

  render() {
    return null
  }
}

export default connect(null, {logoutAction})(Logout);