import React, { Component } from 'react';
import { Keyboard, TextInput, ScrollView, Button, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen({ route, navigation }) {
    React.useLayoutEffect(() => {
        let previous = route.params.previous
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons.Button
                    onPress={() => navigation.navigate(previous)}
                    color="#707070"
                    backgroundColor="#f8f8f8"
                    name="close"
                    size="30"
                />
            ),
        });
    }, [navigation, route]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputHeader}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        // placeholder="Title"
                        maxLength={20}
                        onBlur={Keyboard.dismiss}
                    />
                    <Text style={styles.inputHeader}>Category</Text>
                    <TextInput
                        style={styles.textInput}
                        // placeholder="Title"
                        maxLength={20}
                        onBlur={Keyboard.dismiss}
                    />
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
    inputContainer: {
        paddingTop: 15,
        marginLeft: 20,
        marginRight: 20
    },
    textInput: {
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 40,
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 12
    },
    inputHeader: {
        fontSize: 18,
        paddingBottom: 5
    }
});
