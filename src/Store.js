// @flow

import { combineReducers } from 'redux';
import { createStore } from 'redux';

type Action = {
  +type: string,
};

export type State = {
  +a: number
};

function red1(state: State = {a: 1}, action: Action): State {
  console.log(action, state);
  //switch()
  return state;
}

const combinedReducers = combineReducers({
  red1,
});

const store = createStore(combinedReducers);

export default store;