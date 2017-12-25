// @flow

import type {User} from '../data-types/user';


export type SimpleActionType = {
  +type: string,
};

export type UsersActionType = {
  +type: string,
  +users?: User[],
  +editUser?: User,
};


export type AuthActionType = {
  +type: string,
  +user?: User,
  +token?: ?string,
  +error?: any
};
