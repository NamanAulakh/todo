import React, { PropTypes } from 'react'
import { Text, View, FlatList, Button, Image } from 'react-native'
import * as todolistStyles from '../styles/todolist'
import Item from './Item'

const TodoList = ({ todoList, deleteItem, deleteAll }) => {
  const { todolist, deleteAllButton, chillImage, image } = todolistStyles.styles

  if (todoList.length === 0)
    return (
      <View style={chillImage}>
        <Image style={image} source={require('../images/chill.png')} />
      </View>
    )

  return (
    <View style={todolist}>
      <View style={deleteAllButton}>
        <Button onPress={deleteAll} title="Delete All" color="#0A48A5" />
      </View>

      <FlatList
        data={todoList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Item todoItem={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  )
}

TodoList.propTypes = {}

export default TodoList
