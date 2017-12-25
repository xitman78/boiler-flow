// @flow
import {push} from 'react-router-redux';

import type {AuthActionType} from './actionTypes';
import actions from './actionConstants';
import type {StoreType} from "../store/storeTypes";
import type {User} from '../data-types/user';

type Dispatch = (action: AuthActionType | ThunkAction | PromiseAction) => any;
type GetState = () => StoreType;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<AuthActionType>;

type ResponseType = {
  status: string,
  result: {
    user?: User,
    token?: string,
  }
}

export function loginRequest(email: string, password: string, captcha: string): ThunkAction {

  return (dispatch: Dispatch) => {

    dispatch({ type: actions.ACTION_LOGIN_STARTED });

    let request = new Request('http://localhost:3231/api/v1/login',
      {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({email, password, captcha}),
      });

    fetch(request)
      .then(response => {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then((json: ResponseType) => {

        if (json.status !== 'ok') throw new Error(json.status);

        if(json.result.token) {
          localStorage.setItem('token', json.result.token);
          dispatch({ type: actions.ACTION_LOGIN_SUCCESS, user: json.result.user, token: json.result.token });
          let savedUrl: ?string = localStorage.getItem('afterLoginRedirect');
          if (savedUrl) {
            dispatch(push(savedUrl));
            localStorage.removeItem('afterLoginRedirect');
          } else {
            dispatch(push('/'));
          }
        } else {
          throw new Error('Token not found in response!');
        }
      })
      .catch(function(error) {
        console.log('Login Error:', error);
        localStorage.removeItem('token');
        dispatch({ type: actions.ACTION_LOGIN_ERROR, payload: error });
      });
  }
}

export function checkAuth(): ThunkAction {

  return (dispatch: Dispatch) => {

    let token: ?string = localStorage.getItem('token');

    if (!token) {
      /**
       ** Token not found
       **/
      dispatch({type: actions.ACTION_AUTH_TOKEN_NOT_FOUND});
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/profile',
      {
        method: 'GET',
        headers: new Headers({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'x-access-token': token,
        }),
      });

    fetch(request)
      .then(response => {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then((json: ResponseType) => {

        if (json.status !== 'ok') throw new Error(json.status);

        dispatch({ type: actions.ACTION_AUTH_CONFIRMED, user: json.result.user, token: token });
      })
      .catch(function(error) {
        localStorage.removeItem('token');
        dispatch({ type: actions.ACTION_AUTH_REJECTED, error: error });
        dispatch(push('/login'));
      });
  }
}

export function redirectLogin() {
  return (dispatch: Dispatch) => {
    let currentUrl = window.location.pathname;
    localStorage.setItem('afterLoginRedirect', currentUrl);
    dispatch(push('/login'));
  }
}

export function logoutAction(): ThunkAction {

  return (dispatch) => {

    localStorage.removeItem('token');

    dispatch({ type: actions.ACTION_LOGOUT });

    dispatch(push('/login'));

  }
}