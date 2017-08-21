import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import * as rootStyles  from './styles/root';
import TodoForm from './stateful_components/TodoForm';

const Root = () => {
  const {
    root
  } = rootStyles.styles;

  return(
    <View style={root}>
      <TodoForm/>
    </View>
  );
};

Root.propTypes = {

};

export default Root;
