// @flow

export type CounterState = {
  +a: number
};

export type User = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
};

export type UsersState = {
  count: number,
  list: User[],
};