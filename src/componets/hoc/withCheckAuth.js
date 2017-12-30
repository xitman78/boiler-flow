// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {checkAuth} from "../../actions/authActions";
import {createStructuredSelector} from 'reselect';
import type {StoreType} from "../../store/storeTypes";


export default function withCheckAuth(Component: React.ComponentType<any>): React.ComponentType<any> {

  class WithCheckAuth extends React.Component<{authChecked: boolean, checkAuth: Function}, {checkingAuth: boolean}> {

    componentWillMount() {
      if (!this.props.authChecked) {
        this.props.checkAuth();
      }
    }

    render() {
      if (this.props.authChecked) {
        return <Component {...this.props} />;
      } else {
        return null;
      }
    }
  }

  const selector = createStructuredSelector({
    authChecked: (state: StoreType) => state.auth.authChecked,
  });

  const actionsMap = {
    checkAuth: checkAuth,
  };

  return connect(selector, actionsMap)(WithCheckAuth);

}