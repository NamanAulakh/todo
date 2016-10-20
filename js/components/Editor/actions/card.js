
'use strict';

import type {Action} from './types';

export const MOVE_CARD = 'MOVE_CARD';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_TEXT = 'ADD_TEXT';
export const MAKE_ACTIVE = 'MAKE_ACTIVE';
export const BRING_TO_TOP = 'BRING_TO_TOP';
export const SEND_TO_BACK = 'SEND_TO_BACK';
export const SHOW_ALL = 'SHOW_ALL';
export const FLIP_IMAGE = 'FLIP_IMAGE';
export const DUPLICATE_IMAGE = 'DUPLICATE_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const ADD_DATA = 'ADD_DATA';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const TAKE_SCREENSHOT = 'TAKE_SCREENSHOT';
export const CHANGE_CURRENT_INDEX = 'CHANGE_CURRENT_INDEX';

export function moveCard(payload:Object, index:Number):Action {

    return {
        type: MOVE_CARD,
        payload: payload,
        index: index
    };
}
export function updateText(text,i) {
  return {
    type: UPDATE_TEXT,
    text: text,
    index: i
  };
}

export function addData(payload:Object):Action {

    return {
        type: ADD_DATA,
        payload: payload
    };
}
export function addText(payload:String):Action {

    return {
        type: ADD_TEXT,
        payload: payload
    };
}

export function changeCurrentIndex(index:Number):Action {
    return {
        type: CHANGE_CURRENT_INDEX,
        index: index
    };
}

export function addImage():Action {
    return {
        type: ADD_IMAGE
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
  return {
    type: TAKE_SCREENSHOT
  };
}
