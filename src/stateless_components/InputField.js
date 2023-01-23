import React, { PropTypes } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import * as inputFieldStyles from '../styles/inputField';

const InputField = ({
  value,
  onChangeText
}) => {
  const {
    inputField,
    textField
  } = inputFieldStyles.styles;

  return(
    <View style={inputField}>
      <TextInput
        placeholder={"Add an item to do"}
        style={textField}
        onChangeText={onChangeText}
        value={value}
        underlineColorAndroid={"transparent"}
        selectionColor={"#0A48A5"}/>
    </View>
  );
};

InputField.propTypes = {

};

export default InputField;
