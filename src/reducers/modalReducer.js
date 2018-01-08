// @flow

import type {SimpleActionType} from "../actions/actionTypes";
import type {ModalsState} from "../store/storeTypes";
import actions from "../actions/actionConstants";

import type {ModalActionType} from '../actions/actionTypes';

const defaultState: ModalsState = {
  show: false,
};

export function modals(state: ModalsState = defaultState, action: ModalActionType): ModalsState {

  switch(action.type) {

    case actions.ACTION_SHOW_MODAL_ALERT:
      return {show: true, modalType: 'ALERT', modalMessage: action.message};

    case actions.ACTION_HIDE_MODAL_ALERT:
      return {show: false};

    default:
      return state;

  }
}