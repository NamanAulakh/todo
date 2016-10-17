
'use strict';

import type {Action} from './types';

export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const MAKE_ACTIVE = 'MAKE_ACTIVE';
export const BRING_TO_TOP = 'BRING_TO_TOP';
export const SEND_TO_BACK = 'SEND_TO_BACK';
export const SHOW_ALL = 'SHOW_ALL';
export const FLIP_IMAGE = 'FLIP_IMAGE';
export const DUPLICATE_IMAGE = 'DUPLICATE_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const DATA = 'DATA';
export const TOGGLE = 'TOGGLE';

export function moveCard(payload:Object, index:Number):Action {

    return {
        type: MOVE_CARD,
        payload: payload,
        index: index
    };
}

export function addData(payload:Object):Action {

    return {
        type: DATA,
        payload: payload
    };
}

export function addCard():Action {
    return {
        type: ADD_CARD
    };
}

export function toggle():Action {
    return {
        type: TOGGLE
    };
}

export function makeActive(index:Number):Action {
    return {
        type: MAKE_ACTIVE,
        index: index
    };
}

export function bringToTop(index:Number):Action {
    return {
        type: BRING_TO_TOP,
        index: index
    };
}

export function sendToBack(index:Number):Action {
    return {
        type: SEND_TO_BACK,
        index: index
    };
}

export function flipImage(index:Number):Action {
    return {
        type: FLIP_IMAGE,
        index: index
    };
}

export function duplicateImage(index:Number):Action {
    return {
        type: DUPLICATE_IMAGE,
        index: index
    };
}

export function removeImage(index:Number):Action {
    return {
        type: REMOVE_IMAGE,
        index: index
    };
}
export function showAll():Action {
    return {
        type: SHOW_ALL
    };
}

export function takeScreenshot():Action {
  console.log('hi i m in takeScreenshot');
  return {
    type: TOGGLE
  };
}
