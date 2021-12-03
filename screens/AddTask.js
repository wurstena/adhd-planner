import React, { Component, useState } from 'react';
import { Pressable, Modal, Keyboard, TextInput, ScrollView, Button, View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dimensions } from 'react-native';
import { ColorPicker } from 'react-native-status-color-picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import saveTasks from '../storage/saveInput'
import { State } from 'react-native-gesture-handler';

let deviceWidth = Dimensions.get('window').width

var radio_props = [
    { label: 'Low', index: 0, color: "green" },
    { label: 'Medium', index: 1, color: "orange" },
    { label: 'High', index: 2, color: "red" }
];

const DEMO_OPTIONS_1 = [
    { title: 'Category 1', color: 'red', color_icon: true },
    { title: '+ Add a New Category', color_icon: false }];

const REWARD_OPTIONS = [
    { title: 'Eat a piece of candy', color_icon: false },
    { title: 'Watch an episode of your favorite show', color_icon: false },
    { title: '+ Add a New Reward', color_icon: false }
]

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
            headerRight: () => (
                <Button
                    title="Save"
                    onPress={() => { handleSave() }}
                />
            )
        });
    }, [navigation, route]);

    function handleSave() {
        let task = {
            title: title
        }
        console.log(title);
        saveTasks(task)
        // setTask(null);
    }

    const [modalVisible, setModalVisible] = useState(false);

    function dropdown_6_onSelect(idx, value) {
        console.log(`${idx}, ${value.title}`)
        if (value.title === "+ Add a New Category" || value.title === "+ Add a New Reward") {
            console.log("in if statement")
            setModalVisible(!modalVisible)
        }
    };

    function dropdown_renderButtonText(rowData) {
        return dropdown_renderRow(rowData)
    }

    function dropdown_renderRow(rowData) {
        return (
            <View style={{ flexDirection: "row" }}>
                {
                    rowData.color_icon &&
                    <Ionicons name="square" style={{ color: rowData.color, marginTop: 4, marginLeft: 6 }} size="30" />
                }
                <Text style={styles.dropdown_rows}>
                    {`${rowData.title}`}
                </Text>
            </View>
        );
    }

    var [colors, selectedColor] = useState(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"], '#F44336')
    var [radio_button_val] = useState(1)
    // var [title, category_label, date, time, priority, reward, notes] = useState("", "", "", "", "", "", "")

    const [title, setTitle] = useState();

    var onSelect = color => selectedColor = color;

    function getColor(index) {
        if (index == 0) {
            return "#14DC3D"
        } else if (index == 1) {
            return "#F2B100"
        } else {
            return "#FF2D1E"
        }
    }


    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        {<ColorPicker
                            colors={colors}
                            selectedColor={selectedColor}
                            onSelect={onSelect}
                        />}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={100}
                enabled
            >
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputHeader}>Title</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Write a task'}
                            value={title}
                            onEndEdit={text => setTitle(text)}
                            // onBlur={Keyboard.dismiss()}
                        />
                        <Text style={styles.inputHeader}>Category</Text>
                        <ModalDropdown style={styles.dropdown}
                            options={DEMO_OPTIONS_1}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            onSelect={(idx, value) => dropdown_6_onSelect(idx, value)}
                            renderRow={dropdown_renderRow.bind(this)}
                            renderButtonText={(rowData) => dropdown_renderButtonText(rowData)}>
                        </ModalDropdown>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: (Dimensions.get('screen').width / 2 - 25),
                                    marginRight: 5
                                }}>
                                <Text style={styles.inputHeader}>Date</Text>
                                <TextInput
                                    style={styles.textInput}
                                    // placeholder="Title"
                                    maxLength={20}
                                    onBlur={Keyboard.dismiss}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: (Dimensions.get('screen').width / 2 - 25),
                                    marginLeft: 5
                                }}>
                                <Text style={styles.inputHeader}>Time</Text>
                                <TextInput
                                    style={styles.textInput}
                                    // placeholder="Title"
                                    maxLength={20}
                                    onBlur={Keyboard.dismiss}
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontSize: 18, paddingBottom: 10, paddingTop: 5 }}>Priority</Text>
                            <RadioForm
                                radio_props={radio_props}
                                initial={1}
                                formHorizontal={true}
                                onPress={(index) => { radio_button_val = index }}
                                radioStyle={{ paddingRight: 50 }}
                            />
                        </View>
                        <Text style={styles.inputHeader}>Reward</Text>
                        <ModalDropdown style={styles.dropdown}
                            options={REWARD_OPTIONS}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            onSelect={(idx, value) => dropdown_6_onSelect(idx, value)}
                            renderRow={dropdown_renderRow.bind(this)}
                            renderButtonText={(rowData) => dropdown_renderButtonText(rowData)}>
                        </ModalDropdown>
                        <Text style={styles.inputHeader}>Notes</Text>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            maxLength={20}
                            onBlur={Keyboard.dismiss}
                        />
                    </View>
                </ScrollView >
            </KeyboardAvoidingView>
        </View >
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
        fontSize: 18,
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 12,
        flex: 1
    },
    inputHeader: {
        fontSize: 18,
        paddingBottom: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    dropdown: {
        backgroundColor: "white",
        borderColor: '#d3d3d3',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 45,
        fontSize: 18,
        flex: 1,
        marginBottom: 12
    },
    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: '#707070'
    },
    dropdown_dropdown: {
        borderColor: '#d3d3d3',
        borderWidth: 1,
        width: Dimensions.get('screen').width - 40,
        paddingRight: 20,
    },
    dropdown_rows: {
        fontSize: 18,
        margin: 8,
        color: "#4b4b4b",
        height: 25
    }
});
