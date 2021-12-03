import React, { useState } from 'react';
import { KeyboardAvoidingView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ route, navigation }) {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons.Button
                    onPress={() => navigation.navigate("Add a Task", {previous: "Dashboard"})}
                    color="#707070"
                    backgroundColor="#f8f8f8"
                    name="add"
                    size="30"
                />
            ),
        });
    }, [navigation, route]);

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
                        {/* This is where the tasks will go! */}
                        {
                            taskItems.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                        <Task text={item} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}

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
    addText: {},
});
