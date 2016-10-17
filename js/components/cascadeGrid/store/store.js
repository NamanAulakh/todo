import {
  createStore
} from 'redux'  ;

import reducer from '../reducer/'  ;

// Add Middleware

export default function configureStore  ()  {
  return createStore  (reducer );
}
