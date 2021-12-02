import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';

export default function AddTaskScreen({route, navigation}) {
    // navigation.setParams({ previous: route.params.previous });
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons.Button
                    onPress={() => navigation.navigate(route.params.previous)}
                    color="#707070"
                    backgroundColor="#f8f8f8"
                    name="close"
                    size="30"
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>Add a new Task Screen</Text>
            <Text>{route.params.previous}</Text>
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
