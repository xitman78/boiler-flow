// @flow

import type { SimpleActionType } from './actionTypes';
import actions from './actionConstants';

export function toggleDrawer(): SimpleActionType {
  return { type: actions.ACTION_UI_TOGGLE_DRAWER };
}


