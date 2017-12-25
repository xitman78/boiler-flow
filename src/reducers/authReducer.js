// @flow

import type {AuthActionType} from "../actions/actionTypes";
import type {AuthState} from "../store/storeTypes";
import actions from "../actions/actionConstants";

const defaultState = {
  authUser: null,
  token: null,
  authChecked: false,
};

export function auth(state: AuthState = defaultState, action: AuthActionType): AuthState {

  switch(action.type) {

    case actions.ACTION_LOGIN_STARTED:
      return {authUser: null, token: null, authChecked: true};

    case actions.ACTION_LOGIN_SUCCESS:
      return {authUser: action.user, token: action.token, authChecked: true};

    case actions.ACTION_LOGIN_ERROR:
      return {authUser: null, token: null, authChecked: true};

    case actions.ACTION_LOGOUT:
      return {authUser: null, token: null, authChecked: true};

    case actions.ACTION_AUTH_CONFIRMED:
      return {authUser: action.user, token: action.token, authChecked: true};

    case actions.ACTION_AUTH_TOKEN_NOT_FOUND:
      return {authUser: null, token: null, authChecked: true};

    default:
      return state;

  }
}