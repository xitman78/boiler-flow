// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {redirectLogin} from "../loginForm/actions";


type Props = {
  token: ?string,
  redirectLogin: () => any,
};

export default function withLoginRedirect(Component: React.ComponentType<any>): React.ComponentType<any> {

  class WithLoginRedirect extends React.Component<Props> {

    componentWillMount() {
      if (!this.props.token) this.props.redirectLogin();
    }

    render() {
      if (this.props.token) {
        return <Component />;
      } else {
        return null;
      }
    }
  }

  return connect(state => ({
      token: state.auth.token
    }),
    {
      redirectLogin: redirectLogin,
    })(WithLoginRedirect)

}