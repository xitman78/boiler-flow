// @flow

import type { SimpleActionType } from '../../actions/actionTypes';
import actions from '../../constants/actionConstants';

export function increment(): SimpleActionType {
  return { type: actions.ACTION_INCREMENT };
}

export function decrement(): SimpleActionType {
  return { type: actions.ACTION_DECREMENT };
}