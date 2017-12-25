// @flow

import type {User} from '../data-types/user';

export type CounterState = {
  +a: number
};

export type UsersState = {
  count: number,
  list?: User[],
  editUser?: User,
};

export type AuthState = {
  authUser: ?User,
  token: ?string,
  authChecked: boolean
};

export type StoreType = {
  users: UsersState,
  auth: AuthState,
};