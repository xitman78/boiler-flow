// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import {counter} from '../componets/counter/reducer';
import {users} from '../componets/users/reducer';
import {auth} from '../componets/loginForm/reducer';

export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];


const combinedReducers = combineReducers({
  counter,
  users,
  auth,
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