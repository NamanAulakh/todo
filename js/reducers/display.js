
'use strict';

import type {Action} from '../actions/types';
import {TOGGLE, TOGGLE_TAB} from '../actions/display';

export type State = {
    display: string,
    renderUp: boolean,
    currentTab: boolean
}

const initialState = {
    display: '',
    renderUp: false,
    currentTab: false
};

export default function (state:State = initialState, action:Action): State {


  if (action.type === TOGGLE_TAB) {
    console.log('...Inside display store...',action.type);
      return {
          ...state,
          currentTab: true
      };
  }

  return state;
}
