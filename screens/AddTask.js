import React, { Component, useState } from 'react';
import { Pressable, Modal, Keyboard, TextInput, ScrollView, Button, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width

const COLORS = [
    '#d73964',
    '#d23440',
    '#db643a',
    '#e88334',
    '#e2a71e',
    '#e25241',
    '#d0da59',
    '#4053ae',
    '#70b949',
    '#73564a',
    '#67ab5a',
    '#8f36aa',
    '#f6c244',
    '#52b9d0',
    '#4595ec',
    '#009688',
    '#5abeA7',
    '#59bccd',
    '#4a97e4',
    '#2d68cd',
    '#9946c7',
    '#d9639e',
    '#6d6f74',
    '#939287',
    '#868ea3',
];
const DEMO_OPTIONS_1 = [
    { value: 'Category 1', color: 'red', color_icon: true },
    { value: '+ Add a New Category', color_icon: false }];

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

    const [modalVisible, setModalVisible] = useState(false);

    function dropdown_6_onSelect(idx, value) {
        console.log(`${idx}, ${value}`)
        if (value.value === "+ Add a New Category") {
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
                    {`${rowData.value}`}
                </Text>
            </View>
        );
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
                        <NativeColorPicker
                            colors={COLORS}
                            selectedColor={selected}
                            gradient
                            sort
                            shadow
                            markerType="checkmark"
                            markerDisplay="adjust"
                            onSelect={(item) => setSelected(item)}
                            scrollEnabled={false}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
                </View>
            </ScrollView >
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
