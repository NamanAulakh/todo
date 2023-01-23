import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 5
  },
  todoText: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    padding: 10
  }
});
