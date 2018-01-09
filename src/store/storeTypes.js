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
  serverErrorMsg?: string,
};

export type AuthState = {
  authUser: ?User,
  token: ?string,
  authChecked: boolean
};

export type DrawerState = {
  isDrawerOpen: boolean,
};

export type ModalsState = {
  show: boolean,
  modalType?: 'ALERT' | 'CONFIRM',
  modalResult?: string,
  modalMessage?: string,
  modalTitle?: string,
  confirmText?: string,
  rejectText?: string,
  callback?: (string) => void,
};

export type StoreType = {
  users: UsersState,
  auth: AuthState,
  UI: DrawerState,
  counter: CounterState,
  modals: ModalsState,
};