import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import * as itemStyles from '../styles/item';

const Item = ({
  todoItem,
  index,
  deleteItem
}) => {
  const {
    item,
    todoText,
    deleteButton
  } = itemStyles.styles;

  return(
    <View style={item}>
      <View style={deleteButton}>
        <Button
          onPress={() => deleteItem(todoItem)}
          title="X"
          color="#0A48A5"/>
      </View>

      <View style={todoText}>
        <Text>{todoItem}</Text>
      </View>
    </View>
  );
};

Item.propTypes = {

};

export default Item;
