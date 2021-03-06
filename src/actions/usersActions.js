// @flow
import {push} from 'react-router-redux';

import type {SimpleActionType, UsersActionType} from './actionTypes';
import type {StoreType} from "../store/storeTypes";
import type {User} from '../data-types/user';
import actions from './actionConstants';

type Dispatch = (action: UsersActionType) => any;
type GetState = () => StoreType;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
// type PromiseAction = Promise<UsersActionType>;

type ErrorResponseType =  {
  status: string,
  msg: string,
};

export function cleanEditUserData(): SimpleActionType {
  return {
    type: actions.ACTION_CLEAN_EDIT_USED_DATA,
  };
}

export function getUsers(_page?: number, _itemsPerPage?: number): ThunkAction {

  return (dispatch: Dispatch, getState) => {

    let token = getState().auth.token;

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let page: number = _page !== undefined ? _page : getState().users.page;
    let perPage: number = _itemsPerPage !== undefined ? _itemsPerPage : getState().users.itemsPerPage;

    let request = new Request(`http://localhost:3231/api/v1/users?page=${page}&per_page=${perPage}`,
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
      .then((json: {users: User[], totalCount: number, page: number, perPage: number}) => {
        dispatch({ type: actions.ACTION_LOAD_USERS_SUCCESS, users: json.users, totalCount: json.totalCount, page: json.page, perPage: perPage });
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}

export function getNewUser(): UsersActionType {

  return {
    type: actions.ACTION_NEW_USER_CREATED,
    editUser: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'm',
      password: '',
      confirmPassword: '',
      chief: [],
      department: [],
    }
  };

}

export function getUser(id: string): ThunkAction {

  return (dispatch: Dispatch, getState) => {

    dispatch({ type: actions.ACTION_LOADING_USER });

    let token = getState().auth.token;

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
      .then((json: {user: User}) => {
        dispatch({ type: actions.ACTION_LOAD_USER_SUCCESS, editUser: json.user });
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}

export function updateUser(id: string, values: User): ThunkAction {

  return (dispatch: Dispatch, getState: GetState) => {

    let userOrg = getState().users.editUser;

    let userData = Object.assign({}, userOrg, values);

    delete userData._id;
    delete userData.createdAt;
    delete userData.active;

    dispatch({ type: actions.ACTION_SAVING_USER });

    let token = getState().auth.token;

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
      .then((json: User | ErrorResponseType) => {
        if (json.status === 'err') {
          dispatch({ type: actions.ACTION_SAVE_USER_ERROR, error: json.msg });
        } else {
          dispatch({ type: actions.ACTION_SAVE_USER_SUCCESS, editUser: json });
          dispatch(push('/users'));
        }
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
        dispatch({ type: actions.ACTION_SAVE_USER_ERROR, error: "Network error." });
      });
  }
}

export function createUser(values: User): ThunkAction {

  return (dispatch: Dispatch, getState: GetState) => {

    let userOrg = getState().users.editUser;

    let userData = Object.assign({}, userOrg, values);

    delete userData._id;
    delete userData.createdAt;
    delete userData.active;

    let token = getState().auth.token;

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/users',
      {
        method: 'POST',
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
      .then((json: User | ErrorResponseType ) => {
        if (json.status === 'err') {
          dispatch({ type: actions.ACTION_SAVE_USER_ERROR, error: json.msg });
        } else {
          dispatch({ type: actions.ACTION_SAVE_USER_SUCCESS, editUser: json });
          dispatch(push('/users'));
        }
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
        dispatch({ type: actions.ACTION_SAVE_USER_ERROR, error: 'Network error.' });
      });
  }
}

export function removeUser(id: string): ThunkAction {

  return (dispatch: Dispatch, getState) => {

    let token = getState().auth.token;

    if (!token) {
      dispatch({type: actions.ACTION_LOGOUT});
      dispatch(push('/login'));
      return;
    }

    let request = new Request('http://localhost:3231/api/v1/users/' + id,
      {
        method: 'DELETE',
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
      .then((json: {status: string, msg?: string}) => {
        console.log('json', json);
        if (json.status === 'ok') {
          dispatch({ type: actions.ACTION_USER_DELETED_SUCCESS});
          dispatch(push('/users'));
        } else {
          dispatch({ type: actions.ACTION_USER_DELETED_ERROR, error: json.msg ? json.msg : 'Unknown error'});
        }
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
        dispatch({ type: actions.ACTION_USER_DELETED_ERROR, error: 'Server error.'});
      });
  }
}