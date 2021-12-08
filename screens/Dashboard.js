import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../components/Task';
import { Ionicons } from '@expo/vector-icons';
import { completeTask, task_list, completed_task_list } from '../storage/saveInput';
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

    const [listOfTasks, setListOfTasks] = useState([])

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            setListOfTasks(task_list)
        }
    }, [navigation, route, isFocused]);

    const [value, setValue] = useState(0);
    function showTasks() {
        return (
            <View>
                {
                    listOfTasks.map((object, index) => {
                        return (
                            <Task text={object.title} index={index} value={value} setValue={setValue} />
                        )
                    })
                }
            </View>
        );
    }

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

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

                <PieChart style={{ height: 200 }} data={pieData} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
