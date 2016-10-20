
'use strict';

import type {Action} from '../actions/types';
import {TOGGLE,TOGGLE_TAB,SET_OFFSET} from '../actions/display';

export type State = {
    display: Array,
    renderUp: boolean,
    currentTab: boolean,
    arrowUp: boolean
}

const initialState = {
    display: [],
    renderUp: false,
    currentTab: true,
    arrowUp: true,
    offset: 0
};

export default function (state:State = initialState, action:Action): State {

  // console.log('Exterior store: ', action);

  if (action.type === TOGGLE_TAB) {
    if (action.tabValue === 'Collective') {
      return {
          ...state,
          currentTab: true
      };
    } else {
      return {
          ...state,
          currentTab: false
      };
    }
  }

  if (action.type === TOGGLE) {
      state.arrowUp = !state.arrowUp;
      return {
          ...state
      };
  }

  if (action.type === SET_OFFSET) {
    state.offset = action.value;
    return {
        ...state
    };
  }

  return state;
}
