
'use strict';

import type {Action} from '../actions/types';
import {TOGGLE,TOGGLE_TAB,SET_OFFSET,TOGGLE_HANGER} from '../actions/display';

export type State = {
    display: Array,
    renderUp: boolean,
    currentTab: boolean,
    arrowUp: boolean,
    hanger: boolean
}

const initialState = {
    display: [],
    renderUp: false,
    currentTab: true,
    arrowUp: true,
    offset: 0,
    hanger: true
};

export default function (state:State = initialState, action:Action): State {

  // console.log('Exterior store: ', action);

  if (action.type === TOGGLE_TAB) {
    if (action.tabValue === 'Collective') {
      return {
          ...state,
          currentTab: true,
          arrowUp: false
      };
    } else {
      return {
          ...state,
          currentTab: false,
          arrowUp: false
      };
    }
  }

  if (action.type === TOGGLE) {
      state.arrowUp = !state.arrowUp;
      return {
          ...state
      };
  }

  if (action.type === TOGGLE_HANGER) {
      state.hanger = !state.hanger;
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
