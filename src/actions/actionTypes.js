// @flow

import actions from './actionConstants';
import type {User} from '../data-types/user';

import type {TYPE_SHOW_MODAL_ALERT, TYPE_SHOW_MODAL_CONFIRM, TYPE_HIDE_MODAL} from './actionConstants';


export type SimpleActionType = {
  +type: string,
};

export type UsersActionType = {
  +type: string,
  +users?: User[],
  +editUser?: User,
  +totalCount?: number,
  +page?: number,
  +perPage?: number,
  +error?: string,
};


export type AuthActionType = {
  +type: string,
  +user?: User,
  +token?: ?string,
  +error?: any
};

export type ShowAlertActionType = {|
  +type: TYPE_SHOW_MODAL_ALERT,
  +message: string,
  +title?: string,
|};

export type ShowConfirmActionType = {|
  +type: TYPE_SHOW_MODAL_CONFIRM,
  +message: string,
  +title?: string,
  +confirmText?: string,
  +rejectText?: string,
  +callback?: (result: string) => void,
|};

export type HideModalActionType = {|
  +type: TYPE_HIDE_MODAL,
|};

export type ModalActionType = ShowAlertActionType | ShowConfirmActionType | HideModalActionType;
