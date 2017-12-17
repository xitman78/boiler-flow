// @flow
import type { ActionType } from 'actionTypes';
import actions from 'constants/actionConstants';

export function increment(): ActionType {
  return { type: actions.ACTION_INCREMENT };
}

export function decrement(): ActionType {
  return { type: actions.ACTION_DECREMENT };
}