// @flow

export type CounterState = {
  +a: number
};

export type User = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  createdAt: string,
};

export type UsersState = {
  count: number,
  list?: User[],
  editUser?: User,
};

export type AuthState = {
  authUser: ?{},
  token: ?string,
};

export type StoreType = {
  users: UsersState,
  auth: AuthState,
};