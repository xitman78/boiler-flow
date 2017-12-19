// @flow

import type {UsersActionType} from "../../actions/actionTypes";
import type {AuthState} from "../../store/storeTypes";
import actions from "../../constants/actionConstants";

const defaultState = {
  authUser: null
};

export function auth(state: AuthState = defaultState, action: UsersActionType): AuthState {

  console.log(action, state);

  switch(action.type) {

    case actions.ACTION_LOGIN_STARTED:
      return {authUser: null};

    case actions.ACTION_LOGIN_SUCCESS:
      return {authUser: action.payload};

    case actions.ACTION_LOGIN_ERROR:
      localStorage.removeItem('token');
      return {authUser: null};

    case actions.ACTION_LOGOUT:
      localStorage.removeItem('token');
      return {authUser: null};

    default:
      return state;

  }
}