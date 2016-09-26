
'use strict';

import type {Action} from '../actions/types';
import {MOVE_CARD, ADD_CARD, MAKE_ACTIVE, BRING_TO_TOP} from '../actions/card';

export type State = {
    card: Array
}

const initialState = {
    card: []
};


function edit(index, arr, payload) {
    var newArr = [];
    arr.map(function(elem,i)  {
        var obj = elem;
        if (index === i) {
            obj.top = payload.y;
            obj.left = payload.x;
            obj.height = payload.height;
            obj.width = payload.width;
            obj.rotate = payload.rotate;
            obj.rotateNow = payload.rotateNow;
            obj.rotateBefore = payload.rotateBefore;
            obj.active = elem.active;
        }
        newArr.push(obj);
    });

    return newArr;
}

function active(index, arr) {
    var newArr = [];
    arr.map(function(elem,i)  {
        var obj = elem;
        if (index === i) {
            obj.active = 1;
        } else {
            obj.active = 0;
        }
        newArr.push(obj);
    });

    return newArr;
}
function bringToTop(index, arr) {
    var newArr = [];
    var lastItem = null;

    arr.map(function(elem, i)  {
        var obj = elem;
        if (index === i) {
            lastItem = obj;
        } else {
            newArr.push(obj);
        }
    });

    if (lastItem) {
        // console.log("here");
        newArr.push(lastItem);
    }

    return newArr;
}

export default function (state:State = initialState, action:Action): State {

    if (action.type === MOVE_CARD) {
        return {
            ...state, card: [...edit(action.index, state.card, action.payload)]
        };
    }

    if (action.type === ADD_CARD) {
        return {
            ...state,
            card: [...state.card, {
                top: 100,
                left: 10,
                height: 150,
                width: 100,
                rotate: 0,
                active: 0,
                rotateBefore: 0,
                rotateNow: 0
            }]
        };
    }

    if (action.type === MAKE_ACTIVE) {
        return {
            ...state,
            card: [...active(action.index, state.card)]
        };
    }

    if (action.type === BRING_TO_TOP) {
        return {
            ...state,
            card: [...bringToTop(action.index, state.card)]
        };
    }


    return state;
}
