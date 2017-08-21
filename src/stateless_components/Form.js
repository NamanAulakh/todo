import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as formStyles from '../styles/form';
import Heading from './Heading';
import MainContent from './MainContent';

const Form = ({
  value,
  onChangeText,
  addItem,
  disabled
}) => {
  const {
    form,
    headingStyles,
    mainContentStyles
  } = formStyles.styles;

  return(
    <View style={form}>
      <View style={headingStyles}>
        <Heading/>
      </View>

      <View style={mainContentStyles}>
        <MainContent
          value={value}
          onChangeText={onChangeText}
          addItem={addItem}
          disabled={disabled}/>
      </View>
    </View>
  );
};

Form.propTypes = {

};

export default Form;
