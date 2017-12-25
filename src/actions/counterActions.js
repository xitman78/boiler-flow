// @flow

import type { SimpleActionType } from './actionTypes';
import actions from './actionConstants';

export function increment(): SimpleActionType {
  return { type: actions.ACTION_INCREMENT };
}

export function decrement(): SimpleActionType {
  return { type: actions.ACTION_DECREMENT };
}