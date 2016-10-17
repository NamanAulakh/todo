'use strict';

import type {Action} from './types';
export const TOGGLE = 'TOGGLE';

export function takeScreenshot():Action {
  console.log('hi i m in takeScreenshot');
  return {
    type: TOGGLE
  };
}
