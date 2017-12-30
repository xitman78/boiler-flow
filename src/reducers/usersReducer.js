// @flow

import type {UsersActionType} from "../actions/actionTypes";
import type {UsersState} from "../store/storeTypes";
import actions from "../actions/actionConstants";

const defaultState = {
  count: 0,
  page: 1,
  itemsPerPage: 5,
  list: [],
  editUser: undefined,
};

export function users(state: UsersState = defaultState, action: UsersActionType): UsersState {

  switch(action.type) {

    case actions.ACTION_LOAD_USERS_SUCCESS:
      return {...state, count: action.totalCount, page: action.page, list: action.users, itemsPerPage: action.perPage};

    case actions.ACTION_LOADING_USER:
      return {...state, editUser: undefined};

    case actions.ACTION_LOAD_USER_SUCCESS:
      return {...state, editUser: action.editUser};

    case actions.ACTION_NEW_USER_CREATED:
      return {...state, editUser: action.editUser};

    case actions.ACTION_CLEAN_EDIT_USED_DATA:
      return {...state, editUser: undefined};

/*    case actions.ACTION_SAVE_USER_SUCCESS:
      return {...state, editUser: undefined};*/

    case actions.ACTION_LOGOUT:
      return Object.assign({}, defaultState);

    default:
      return state;

  }
}