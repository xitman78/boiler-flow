// @flow
import type { ActionType } from './actionTypes';

export function increment(): ActionType {
  return { type: 'INCREMENT' };
}