
'use strict';

import type {Action} from './types';

export const TOGGLE = 'TOGGLE';
export const TOGGLE_TAB = 'TOGGLE_TAB';

export function toggleTab():Action {
  console.log('hi this is toggle Actions');
  return {
    type: TOGGLE_TAB
  };
}
export function toggle():Action {
  console.log('inside action');
    return {
        type: TOGGLE
    };
}
