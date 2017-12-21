// @flow

import type {PayloadActionType} from "../../actions/actionTypes";
import type {AuthState} from "../../store/storeTypes";
import actions from "../../constants/actionConstants";

const defaultState = {
  authUser: null,
  token: null,
};

export function auth(state: AuthState = defaultState, action: PayloadActionType): AuthState {

  console.log(action, state);

  switch(action.type) {

    case actions.ACTION_LOGIN_STARTED:
      return {authUser: null, token: null};

    case actions.ACTION_LOGIN_SUCCESS:
      return {authUser: action.payload.user, token: action.payload.token};

    case actions.ACTION_LOGIN_ERROR:
      return {authUser: null, token: null};

    case actions.ACTION_LOGOUT:
      return {authUser: null, token: null};

    case actions.ACTION_AUTH_CONFIRMED:
      return {authUser: action.payload.user, token: action.payload.token};

    default:
      return state;

  }
}