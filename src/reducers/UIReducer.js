// @flow

import type {SimpleActionType} from "../actions/actionTypes";
import type {DrawerState} from "../store/storeTypes";
import actions from "../actions/actionConstants";

const defaultState = {
  isDrawerOpen: false,
};

export function UI(state: DrawerState = defaultState, action: SimpleActionType): DrawerState {

  switch(action.type) {

    case actions.ACTION_UI_TOGGLE_DRAWER:
      return {isDrawerOpen: !state.isDrawerOpen};

    default:
      return state;

  }
}