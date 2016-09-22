
'use strict';

import type {Action} from './types';

export const MOVE_CARD = "MOVE_CARD";
export const ADD_CARD = "ADD_CARD";
export const MAKE_ACTIVE = "MAKE_ACTIVE";

export function moveCard(payload:object, index:integer):Action {

    return {
        type: MOVE_CARD,
        payload: payload,
        index: index
    }
}

export function addCard():Action {
    return {
        type: ADD_CARD
    }
}
export function makeActive(index:integer):Action {
    return {
        type: MAKE_ACTIVE,
        index: index
    }
}
