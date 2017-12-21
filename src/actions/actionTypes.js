// @flow

import type {User} from '../store/storeTypes';

type PayloadType = {user: User, token: string} | User | User[]

export type ActionType = {
  +type: string,
};

export type PayloadActionType = {
  +type: string,
  +payload: PayloadType,
};

// export type ActionType = SimpleAction | UsersAction