
'use strict';

import type {Action} from './types';

export const TOGGLE = 'TOGGLE';
export const TOGGLE_TAB = 'TOGGLE_TAB';
export const SET_OFFSET = 'SET_OFFSET';

export function toggleTab(tabValue: String):Action {
  return {
    type: TOGGLE_TAB,
    tabValue: tabValue
  };
}

export function setOffset(value:Number):Action {
    return {
        type: SET_OFFSET,
        value: value
    };
}

export function toggle():Action {
    return {
        type: TOGGLE
    };
}
