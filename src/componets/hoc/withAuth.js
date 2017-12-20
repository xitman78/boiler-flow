// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {checkAuth} from "../loginForm/actions";


export default function withAuth(Component: React.ComponentType<any>): React.ComponentType<any> {

  class _withAuth extends React.PureComponent<{authUser: ?{}, checkAuth: Function}> {

    componentWillMount() {
      if (!this.props.authUser) this.props.checkAuth();
    }

    render() {
      if (this.props.authUser) {
        return <Component authUser={this.props.authUser} />;
      } else {
        return null;
      }
    }
  }

  return connect(state => ({
      authUser: state.auth.authUser
    }),
    {
      checkAuth: checkAuth,
    })(_withAuth)

}