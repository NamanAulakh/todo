
'use strict';

import type {Action} from './types';

export const TOGGLE = 'TOGGLE';

export function toggle():Action {
  console.log('inside action');
    return {
        type: TOGGLE
    };
}
