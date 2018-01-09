// @flow

import actions from './actionConstants';
import type {User} from '../data-types/user';


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
  +type: actions.ACTION_SHOW_MODAL_ALERT,
  +message: string,
  +title?: string,
|};

export type HideAlertActionType = {|
  +type: actions.ACTION_HIDE_MODAL_ALERT,
|};

export type ModalActionType = ShowAlertActionType | HideAlertActionType;
