
'use strict';

import {combineReducers} from 'redux';

import drawer from './drawer';
import route from './route';
import user from './user';
import list from './list';
import display from './display';

export default combineReducers({
   drawer,
   route,
   user,
   list,
   display
});
