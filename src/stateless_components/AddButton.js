import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import * as addButtonStyles from '../styles/addButton';

const AddButton = ({
  addItem,
  disabled
}) => {
  const {
    addButton
  } = addButtonStyles.styles;

  return(
    <View style={addButton}>
      <Button
        onPress={addItem}
        title="Add item"
        color="#0A48A5"
        disabled={disabled}/>
    </View>
  );
};

AddButton.propTypes = {

};

export default AddButton;
