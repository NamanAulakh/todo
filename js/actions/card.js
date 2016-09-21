
'use strict';

import type {Action} from './types';

export const MOVE_CARD = "MOVE_CARD";

export function moveCard(payload:object):Action {

    return {
        type: MOVE_CARD,
        payload: payload
    }
}

// export function closeDrawer():Action {
//     return {
//         type: CLOSE_DRAWER
//     }
// }
