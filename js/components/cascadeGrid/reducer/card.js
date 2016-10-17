'use strict';

import type {Action} from '../actions/types';
import {TOGGLE} from '../actions/card';
export type State = {
    screenshot: boolean
}

const initialState = {
    screenshot: false
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === TOGGLE) {
      console.log('hi i m in takeScreenshot reducer');
        return {
            ...state,screenshot: !state.screenshot

        };
    }


    return state;
}
