import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as todoFormStyles  from '../styles/todoForm';
import Form from '../stateless_components/Form';
import TodoList from '../stateless_components/TodoList';

class TodoForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      todoList: []
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  onChangeText(value) {
    this.setState({
      value
    });
  }

  addItem() {
    const {
      todoList,
      value
    } = this.state;

    this.setState({
      todoList: todoList.concat(value),
      value: ''
    });
  }

  deleteItem(value) {
    this.setState({
      todoList: this.state.todoList.filter(item => item !== value)
    });
  }

  deleteAll() {
    this.setState({
      todoList: []
    });
  }

  render() {
    const {
      todoForm,
      formStyles,
      todoListStyles
    } = todoFormStyles.styles;

    const {
      value,
      todoList
    } = this.state;

    return(
      <View style={todoForm}>
        <View style={formStyles}>
          <Form
            value={value}
            onChangeText={this.onChangeText}
            addItem={this.addItem}
            disabled={value === ''}/>
        </View>

        <View style={todoListStyles}>
          <TodoList
            todoList={todoList}
            deleteItem={this.deleteItem}
            deleteAll={this.deleteAll}/>
        </View>
      </View>
    );
  }
}

export default TodoForm;
