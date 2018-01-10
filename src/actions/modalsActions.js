// @flow
import actions from './actionConstants';
import type {ShowAlertActionType, HideModalActionType} from './actionTypes';

export function showAlert(msg: string, title?: string): ShowAlertActionType  {
  return {type: actions.ACTION_SHOW_MODAL_ALERT, message: msg, title: title};
}

export function showConfirm(msg: string, title?: string, confirmText?: string, rejectText?: string): Function  {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: actions.ACTION_SHOW_MODAL_CONFIRM,
        message: msg, title: title, confirmText: confirmText, rejectText: rejectText,
        callback: function(result: string) {
          if (result === 'confirm') resolve();
          else reject();
          dispatch({type: actions.ACTION_HIDE_MODAL});
        }
      });
    });
  };
}

export function hideModal(): HideModalActionType  {
  return {type: actions.ACTION_HIDE_MODAL};
}