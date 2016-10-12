
'use strict';

import type {Action} from '../actions/types';
import {TOGGLE} from '../actions/display';

export type State = {
    display: string,
    renderUp: boolean,
}

const initialState = {
    display: '',
    renderUp: false
};

export default function (state:State = initialState, action:Action): State {
  console.log('...Inside display store...');
  if (action.type === TOGGLE) {
    console.log('inside reducer');
      // console.log('inside reducer:flag state: ' , state.renderUp);
      // state.arrowUp=!state.arrowUp;
      // console.log('inside reducer:after toggle: ' , state.arrowUp);
      return {
          ...state
      };
  }

  return state;
}
