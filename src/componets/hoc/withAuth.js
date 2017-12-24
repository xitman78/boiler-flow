// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {checkAuth} from "../loginForm/actions";

import type {User} from '../../store/storeTypes';


export default function withAuth(Component: React.ComponentType<any>): React.ComponentType<any> {

  class WithAuth extends React.Component<{authUser: ?User, checkAuth: Function}> {

    componentWillMount() {
      if (!this.props.authUser) this.props.checkAuth();
    }

    render() {
      return <Component authUser={this.props.authUser} />;
    }
  }

  return connect(state => ({
      authUser: state.auth.authUser
    }),
    {
      checkAuth: checkAuth,
    })(WithAuth)

}