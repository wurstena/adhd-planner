import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import { Ionicons } from '@expo/vector-icons';
import { completeTask, task_list, completed_task_list, getGraphData, getPriorityData } from '../storage/saveInput';
import { useIsFocused } from "@react-navigation/native";
import { PieChart } from 'react-native-svg-charts'

export default function DashboardScreen({ route, navigation }) {
    navigation.setOptions({
        headerRight: () => (
            <Ionicons.Button
                onPress={() => navigation.navigate("Add a Task", { previous: "Dashboard" })}
                color="#707070"
                backgroundColor="#f8f8f8"
                name="add"
                size="30"
            />
        ),
    });

    // const [listOfTasks, setListOfTasks] = useState([])
    // const [listOfCompletedTasks, setListOfCompletedTasks] = useState([])

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
        }
    }, [navigation, route, isFocused]);

    const [value, setValue] = useState(false)

    function showTasks() {
        let priorityTaskList = getPriorityData()
        return (
            <View>
                {
                    priorityTaskList.map((object, index) => {
                        return (
                            <Task text={object.title} key={index} index={index} value={value} setValue={setValue} />
                        )
                    })
                }
            </View>
        );
    }

    function showPieChart() {
        data_stuff = getGraphData();
        const pieData = (data_stuff && data_stuff.length > 0) ? data_stuff
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(index),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            })) : []
        return (
            <View>
                <PieChart style={styles.PieChart} data={pieData} />
            </View>
        );
    }

    const randomColor = (index) => (index == 1 ? "red" : index == 2 ? "green": "blue")

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

            <View>
                {showPieChart()}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    PieChart: {
        height: 200,
        marginBottom: 50
    },
    graphContainer: {
        // alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
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
