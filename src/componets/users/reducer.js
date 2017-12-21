// @flow

import type {PayloadActionType} from "../../actions/actionTypes";
import type {UsersState} from "../../store/storeTypes";
import actions from "../../constants/actionConstants";

const defaultState = {
  count: 0,
  list: [],
  editUser: undefined,
};

export function users(state: UsersState = defaultState, action: PayloadActionType): UsersState {

  console.log(action, state);

  switch(action.type) {

    case actions.ACTION_LOADING_USERS:
      return {...state, count: 0, list: []};

    case actions.ACTION_LOAD_USERS_SUCCESS:
      return {...state, count: action.payload.length, list: action.payload};

    case actions.ACTION_LOADING_USER:
      return {...state, editUser: undefined};

    case actions.ACTION_LOAD_USER_SUCCESS:
      return {...state, editUser: action.payload};

    case actions.ACTION_LOGOUT:
      return Object.assign({}, defaultState);

    default:
      return state;

  }
}