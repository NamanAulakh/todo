import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';
import * as todoFormStyles  from '../styles/todoForm';
import Form from '../stateless_components/Form';
import TodoList from '../stateless_components/TodoList';

class TodoForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      todoList: [],
      loading: true
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.alterAsyncStorage = this.alterAsyncStorage.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('todoList')
    .then((todoList) => {
      if (todoList !== null)
        return this.setState({
          todoList: JSON.parse(todoList),
          loading: false
        });

      this.setState({
        loading: false
      });
    })
    .catch((err) => {
      console.log(err, 'error in fetching from async storage');

      this.setState({
        loading: false
      });
    });
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
    }, () => this.alterAsyncStorage(this.state.todoList));
  }

  deleteItem(value) {
    this.setState({
      todoList: this.state.todoList.filter(item => item !== value)
    }, () => this.alterAsyncStorage(this.state.todoList));
  }

  deleteAll() {
    this.setState({
      todoList: []
    }, () => this.alterAsyncStorage(this.state.todoList));
  }

  alterAsyncStorage(changedTodoList) {
    AsyncStorage.setItem('todoList', JSON.stringify(changedTodoList))
  }

  render() {
    const {
      todoForm,
      formStyles,
      todoListStyles,
      loadingStyles,
      loadingText
    } = todoFormStyles.styles;

    const {
      value,
      todoList,
      loading
    } = this.state;

    if (loading)
      return (
        <View style={loadingStyles}>
          <Text style={loadingText}>Loading...</Text>
        </View>
      );

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
