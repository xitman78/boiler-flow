// @flow

import type {User} from '../store/storeTypes';

type PayloadType = {user: User, token: string} | User | User[]

export type SimpleActionType = {
  +type: string,
};

export type UsersActionType = {
  +type: string,
  +users?: User[],
  +editUser?: User,
};

/*export type AuthPayloadType = {
  +user: User,
  +token: string
};*/

export type AuthActionType = {
  +type: string,
  +user?: User,
  +token?: ?string,
  +error?: any
};

// export type ActionType = SimpleAction | UsersAction