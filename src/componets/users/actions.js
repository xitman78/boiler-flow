// @flow
import type { ActionType } from '../../actions/actionTypes';
import type { UsersState} from "../../store/storeTypes";
import actions from '../../constants/actionConstants';

type Dispatch = (action: ActionType | ThunkAction | PromiseAction) => any;
type GetState = () => UsersState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<ActionType>;

export function getUsers(): ThunkAction {

  return (dispatch, getState) => {

    dispatch({ type: actions.ACTION_LOADING_USERS });

    let token = localStorage.getItem('token');

    console.log(token);

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

  return (dispatch, getState) => {

    dispatch({ type: actions.ACTION_LOADING_USER });

    let token = localStorage.getItem('token');

    console.log(token);

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