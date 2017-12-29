// @flow

import type {User} from '../data-types/user';

export type CounterState = {
  +a: number
};

export type UsersState = {
  count: number,
  page: number,
  itemsPerPage: number,
  list?: User[],
  editUser?: User,
};

export type AuthState = {
  authUser: ?User,
  token: ?string,
  authChecked: boolean
};

export type DrawerState = {
  isDrawerOpen: boolean,
};

export type StoreType = {
  users: UsersState,
  auth: AuthState,
  UI: DrawerState,
};