/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import App from './App.js';

import {Provider} from 'react-redux' ;

import configureStore from './store/store.js' ;

let store = configureStore();

class Editor extends Component {
  render() {
    return (
      <Provider store = { store }   >
        <App {...this.props} />
      </Provider>
    );
  }
}

export default Editor;
