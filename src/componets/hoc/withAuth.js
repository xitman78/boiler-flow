// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {checkAuth} from "../loginForm/actions";


export default function withAuth(Component: React.Component) {

  class _withAuth extends React.PureComponent {

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