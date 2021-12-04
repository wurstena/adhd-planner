import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import { Ionicons } from '@expo/vector-icons';
import { completeTask, task_list, completed_task_list } from '../storage/saveInput';

export default function TasksScreen({ route, navigation }) {
  const [value, setValue] = useState(0); // integer state

  const completeTaskAtIndex = (index) => {
    completeTask(index)
    console.log(completed_task_list)
    console.log(task_list)
    setValue(value => value + 1)
  }

  navigation.setOptions({
    headerRight: () => (
      <Ionicons.Button
        onPress={() => navigation.navigate("Add a Task", { previous: "Tasks" })}
        color="#707070"
        backgroundColor="#f8f8f8"
        name="add"
        size="30"
      />
    ),
  });

  const [listOfTasks, setListOfTasks] = useState([])
  useEffect(() => {
    setListOfTasks(task_list)
  }, [navigation, route, task_list, value]);

  function showTasks() {
    return (
      <View>
        {
          listOfTasks.map((object, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTaskAtIndex(index)}>
                <Task text={object.title} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {
              showTasks()
            }
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
