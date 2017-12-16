// @flow

import { combineReducers } from 'redux';
import { createStore } from 'redux';

import type { ActionType } from './actionTypes';
import type { IncState } from './storeTypes';

function red1(state: IncState = {a: 1}, action: ActionType): IncState {

  console.log(action, state);

  switch(action.type) {
    case 'INCREMENT':
      return {a: state.a + 1};
  }

  return state;
}

const combinedReducers = combineReducers({
  red1,
});

const store = createStore(combinedReducers);

export default store;