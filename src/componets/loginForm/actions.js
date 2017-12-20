// @flow
import {push} from 'react-router-redux';

import type { ActionType } from '../../actions/actionTypes';
import actions from '../../constants/actionConstants';
import type {StoreType} from "../../store/storeTypes";

type Dispatch = (action: ActionType | ThunkAction | PromiseAction) => any;
type GetState = () => StoreType;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<ActionType>;

export function loginRequest(email: string, password: string, captcha: string): ThunkAction {

  return (dispatch) => {

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
      .then(json => {

        if (json.status !== 'ok') throw Error(json);

        console.log('ACTION_LOGIN_SUCCESS', json);
        localStorage.setItem('token', json.result.token);
        dispatch({ type: actions.ACTION_LOGIN_SUCCESS, payload: json.result.user });
        dispatch(push('/'));
      })
      .catch(function(error) {
        console.log('Login Error:', error);
        dispatch({ type: actions.ACTION_LOGIN_ERROR, payload: error });
      });
  }
}

export function checkAuth(): ThunkAction {

  return (dispatch) => {

    let token = localStorage.getItem('token');

    if (!token) {
      /**
       ** Token not found - go to login page
       **/
      dispatch(push('/login'));
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
      .then(json => {

        if (json.status !== 'ok') throw Error(json);

        console.log('ACTION_AUTH_CONFIRMED', json);
        dispatch({ type: actions.ACTION_AUTH_CONFIRMED, payload: json.result.user });
      })
      .catch(function(error) {
        dispatch({ type: actions.ACTION_AUTH_REJECTED, payload: error });
        dispatch(push('/login'));
      });
  }
}

export function logoutAction(): ThunkAction {

  return (dispatch) => {

    localStorage.removeItem('token');

    console.log('-------------ACTION_LOGOUT---------------')

    dispatch({ type: actions.ACTION_LOGOUT });

    dispatch(push('/login'));

  }
}