// @flow
import actions from './actionConstants';
import type {ShowAlertActionType, HideAlertActionType} from './actionTypes';

export function showAlert(msg: string, title?: string): ShowAlertActionType  {
  return {type: actions.ACTION_SHOW_MODAL_ALERT, message: msg, title: title};
}

export function hideAlert(): HideAlertActionType  {
  return {type: actions.ACTION_HIDE_MODAL_ALERT};
}