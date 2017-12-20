// @flow
import {push} from 'react-router-redux';

import type { ActionType } from '../../actions/actionTypes';
import type {StoreType, User} from "../../store/storeTypes";
import actions from '../../constants/actionConstants';

type Dispatch = (action: ActionType | ThunkAction | PromiseAction) => any;
type GetState = () => StoreType;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<ActionType>;

export function getUsers(): ThunkAction {

  return (dispatch: Dispatch, getState) => {

    dispatch({ type: actions.ACTION_LOADING_USERS });

    let token: ?string = localStorage.getItem('token');

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/users?page=1&per_page=30',
      {
        method: 'GET',
        headers: new Headers({
          "x-access-token": token,
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
        console.log(json.users);
        dispatch({ type: actions.ACTION_LOAD_USERS_SUCCESS, payload: json.users });
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}

export function getUser(id: string): ThunkAction {

  return (dispatch: Dispatch, getState) => {

    dispatch({ type: actions.ACTION_LOADING_USER });

    let token: ?string = localStorage.getItem('token');

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/users/' + id,
      {
        method: 'GET',
        headers: new Headers({
          "x-access-token": token,
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
        console.log(json.user);
        dispatch({ type: actions.ACTION_LOAD_USER_SUCCESS, payload: json.user });
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}

export function updateUser(id: string, values: User): ThunkAction {

  return (dispatch: Dispatch, getState: GetState) => {

    console.log('getState', getState());

    let userOrg = getState().users.editUser;

    let userData = Object.assign({}, userOrg, values);

    delete userData._id;
    delete userData.createdAt;
    delete userData.active;

    dispatch({ type: actions.ACTION_SAVING_USER });

    let token: ?string = localStorage.getItem('token');

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/users/' + id,
      {
        method: 'PUT',
        headers: new Headers({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "x-access-token": token,
        }),
        body: JSON.stringify(userData),
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
        console.log(json);
        dispatch({ type: actions.ACTION_SAVE_USER_SUCCESS, payload: json });
        dispatch(push('/users'));
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}