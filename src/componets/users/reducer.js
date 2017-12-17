// @flow

import type {UsersActionType} from "../../actions/actionTypes";
import type {UsersState} from "../../store/storeTypes";
import actions from "../../constants/actionConstants";

const defaultState = {
  count: 0,
  list: [],
};

export function users(state: UsersState = defaultState, action: UsersActionType): UsersState {

  console.log(action, state);

  switch(action.type) {

    case actions.ACTION_LOADING_USERS:
      return {count: 0, list: []};

    case actions.ACTION_LOAD_USERS_SUCCESS:
      return {count: action.users.length, list: action.users };

    default:
      return state;

  }
}