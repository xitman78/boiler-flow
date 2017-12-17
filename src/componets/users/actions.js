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

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(json => {
        console.log(json);
        dispatch({ type: actions.ACTION_LOAD_USERS_SUCCESS, users: json });
      })
      .catch(function(error) {
        console.log('Fetch Error :-S', error);
      });
  }
}