import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerItems from './constants/DrawerItems';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/routers';
import AddTaskScreen from './screens/AddTask';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Dashboard"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
          swipeEdgeWidth: 0,
        }}
      >
        {
          DrawerItems.map(drawer => <Stack.Screen
            name={drawer.name}
            key={drawer.name}
            component={drawer.component}
            options={({ navigation, route }) => ({
              headerTitle: props => <Text {...props} />,
              fontSize: "30",
              headerStyle: { height: 80, backgroundColor: "#F8F8F8" },
              headerTitleStyle: {
                fontSize: "24",
                color: '#4b4b4b'
              }
            })}
          />)
        }
        <Stack.Screen
          name="Add a Task"
          key='Add a Task'
          component={AddTaskScreen}
          options={({ navigation, route }) => ({
            headerTitle: props => <Text {...props} />,
            fontSize: "30",
            headerStyle: { height: 80, backgroundColor: "#F8F8F8" },
            headerTitleStyle: {
              fontSize: "24",
              color: '#4b4b4b'
            },
            drawerLabel: () => null,
            drawerIcon: () => null,
            headerLeft: () => null
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  tasksWrapper: {
    paddingTop: 80,
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
  addText: {}
});
