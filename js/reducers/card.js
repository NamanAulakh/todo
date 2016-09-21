
'use strict';

import type {Action} from '../actions/types';
import { MOVE_CARD } from '../actions/card';

export type State = {
    top : integer,
    left : integer,
    height : integer,
    width : integer,
    rotate : integer
}

const initialState = {
        top: 100, 
        left: 100,
        height: 100,
        width: 100,
        rotate: 0
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === MOVE_CARD) {
        return {
            ...state,
            top: action.payload.top,
            left: action.payload.left,
            height: action.payload.height,
            width: action.payload.width,
            rotate: action.payload.rotate
        };
    }

    return state;
}