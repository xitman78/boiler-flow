export type ActionType = {
  +type: string,
};

export type UsersActionType = {
  +type: string,
  +users: ?any[],
};

// export type ActionType = SimpleAction | UsersAction