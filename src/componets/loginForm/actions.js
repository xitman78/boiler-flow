// @flow
import {push} from 'react-router-redux';

import type { ActionType } from '../../actions/actionTypes';
import actions from '../../constants/actionConstants';

type Dispatch = (action: ActionType | ThunkAction | PromiseAction) => any;
type GetState = () => UsersState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<ActionType>;

export function loginRequest(email, password, captcha): ThunkAction {

  return (dispatch, getState) => {

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

        console.log("json", json);

        if (json.status !== 'ok') throw Error(json);

        console.log('ACTION_LOGIN_SUCCESS', json);
        localStorage.setItem('token', json.result.token);
        dispatch({ type: actions.ACTION_LOGIN_SUCCESS, payload: json });
        dispatch(push('/'));
      })
      .catch(function(error) {
        console.log('Login Error:', error);
        dispatch({ type: actions.ACTION_LOGIN_ERROR, payload: error });
      });
  }
}