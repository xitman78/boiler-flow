// @flow

export type CounterState = {
  +a: number
};

export type User = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
};

export type UsersState = {
  count: number,
  list: User[],
};