import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

export default (props) => {

    return (
        <View style={styles.successView}>
            <View style={styles.spacer}></View>
            <Text style={styles.successText}>{props.message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={props.close}><Text style={styles.x}>x</Text></TouchableOpacity>
        </View>
)
}

const styles = StyleSheet.create({
    successView: {
        position: 'absolute',
        top: 50,
        backgroundColor: '#9e9',
        paddingVertical: 15,
        zIndex: 100,
        width: '80%',
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: '#7e7',
        borderWidth: 2,
        marginLeft: '8.5%'
    },
    successText: {
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