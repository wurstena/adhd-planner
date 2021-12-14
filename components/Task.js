import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { completeTask, task_list, completed_task_list } from '../storage/saveInput';


const Task = (props) => {
  function completeTaskAtIndex(index, value) {
    completeTask(index)
    props.setValue(value => value + 1)
  }

  return (
    <View style={styles(props).item}>
      <View style={styles(props).itemLeft}>
        <View style={styles(props).square}></View>
        <TouchableOpacity onPress={() => completeTaskAtIndex(props.index, props.value)}>
          <View style={styles(props).circular}></View>
        </TouchableOpacity>
        <Text style={styles(props).itemText}>{props.text}</Text>
      </View>
    </View>
  )
}

const styles = (props) => StyleSheet.create({
  item: {
    // backgroundColor: '#FFF',
    // padding: 15,
    // borderRadius: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 20,
    height: 51,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 19,
    height: 51,
    backgroundColor: props.color ? props.color : "#8b8b8b",
    marginRight: 10,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 27,
    height: 27,
    borderColor: '#8b8b8b',
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 15,
  },
});

export default Task;