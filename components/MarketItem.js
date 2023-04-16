import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

const MarketItem = props => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.top}>
            <View style={styles.picFrame}>
                <Image source={require('../assets/cauliflower.png')} style={styles.pic}/>
            </View>
            <View>
                <Text>Pieces: &infin;</Text>
                <Text>Quantity: &infin;</Text>
            </View>
        </View>
        <View style={styles.bottom}>
            <Text>$&infin;</Text>
            <Text>Accepting Counter Offers</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        color: "#7b5536",
        backgroundColor: "#FFFFE0",
        height: '100%',
        width: '45%',
        borderRadius: 5,
        Margin: '5%',
        padding: 2
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
    },
    picFrame: {
        margin: '2%'
    },
    pic: {
        height: 50,
        width: 50
    },
    bottom: {
        marginLeft: '2%'
    }
})

export default MarketItem