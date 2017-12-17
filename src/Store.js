// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import actions from './constants/actionConstants';

import type { ActionType } from './actionTypes';
import type { IncState } from './storeTypes';

export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];


function red1(state: IncState = {a: 1}, action: ActionType): IncState {

  console.log(action, state);

  switch(action.type) {

    case actions.ACTION_INCREMENT:
      return {a: state.a + 1};

    case actions.ACTION_DECREMENT:
      return {a: state.a - 1};

  }

  return state;
}

const combinedReducers = combineReducers({
  red1,
  router: routerReducer
}, applyMiddleware(middleware));

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(combinedReducers, {}, composedEnhancers);

export default store;