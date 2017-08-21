import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as mainContentStyles from '../styles/mainContent';
import InputField from './InputField';
import AddButton from './AddButton';

const MainContent = ({
  value,
  onChangeText,
  addItem,
  disabled
}) => {
  const {
    mainContent,
    addButtonStyles,
    inputStyles
  } = mainContentStyles.styles;

  return(
    <View style={mainContent}>
      <View style={inputStyles}>
        <InputField
          value={value}
          onChangeText={onChangeText}/>
      </View>

      <View style={addButtonStyles}>
        <AddButton
          addItem={addItem}
          disabled={disabled}/>
      </View>
    </View>
  );
};

MainContent.propTypes = {

};

export default MainContent;
