// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {redirectLogin} from "../../actions/authActions";
import type {StoreType} from "../../store/storeTypes";


type Props = {
  isAuthorized: boolean,
  redirectLogin: () => any,
};

export default function withLoginRedirect(Component: React.ComponentType<any>): React.ComponentType<any> {

  class WithLoginRedirect extends React.Component<Props> {

    componentWillMount() {
      if (!this.props.isAuthorized) this.props.redirectLogin();
    }

    render() {
      if (this.props.isAuthorized) {
        let {isAuthorized, ...rest} = this.props;
        return <Component {...rest}/>;
      } else {
        return null;
      }
    }
  }

  const selector = createStructuredSelector({
    isAuthorized: (state: StoreType) =>  !!state.auth.token,
  });

  const actionsMap = {
    redirectLogin: redirectLogin,
  };

  return connect(selector, actionsMap)(WithLoginRedirect);

}