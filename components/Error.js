import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

export default (props) => {

    return (
        <View style={styles.errorView}>
            <View style={styles.spacer}></View>
            <Text style={styles.errorText}>{props.message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={props.close}><Text style={styles.x}>x</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    errorView: {
        position: 'absolute',
        top: 50,
        backgroundColor: '#f99',
        paddingVertical: 15,
        zIndex: 100,
        width: '80%',
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: '#f77',
        borderWidth: 2
    },
    errorText: {
        flex: 10,
        color: '#fff',
        textAlign: 'center',
    },
    closeButton: {
        flex: 1
    },
    x: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
        paddingBottom: 5,
        textAlign: 'center'
    },
    spacer: {
        flex: 1
    }
})