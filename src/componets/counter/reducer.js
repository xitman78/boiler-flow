// @flow

import type {SimpleActionType} from "../../actions/actionTypes";
import type {CounterState} from "../../store/storeTypes";
import actions from "../../constants/actionConstants";

export function counter(state: CounterState = {a: 1}, action: SimpleActionType): CounterState {

  switch(action.type) {

    case actions.ACTION_INCREMENT:
      return {a: state.a + 1};

    case actions.ACTION_DECREMENT:
      return {a: state.a - 1};

    default:
      return state;

  }
}