import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

const productImages = [require('../assets/cauliflower.png'), require('../assets/carrotstack.png'), require('../assets/lettuce.png'), require('../assets/cheese.png')]

const MarketItem = props => {
  return (
    <View style={styles.container}>
    <TouchableOpacity>
        <View style={styles.top}>
            <View style={styles.subA}>
                <Image source={productImages[Math.floor(Math.random() * productImages.length)]} style={styles.pic}/>
            </View>
            <View style={styles.subB}>
                <Text style={styles.productTitle}>{props.product.name}</Text>
                <Text>Pieces: {props.product.count}</Text>
                <Text>Quantity: {props.product.quantity}</Text>
                <Text>Trade: {props.product.trade ? 'Yes' : 'No'}</Text>
                <Text>Counter: {props.product.counter ? 'Yes' : 'No'}</Text>
            </View>
        </View>
        <View style={styles.bottom}>
            <View style={styles.subA}>
                <Text style={styles.price}>${props.product.price}</Text>
            </View>
        </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        color: "#7b5536",
        backgroundColor: "#FFFFE0",
        width: '90%',
        borderRadius: 10,
        padding: 5,
        marginLeft: 15,
        marginBottom: 5
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
    },
    picFrame: {
        margin: 0
    },
    pic: {
        height: 75,
        resizeMode: 'contain'
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '2%'
    },
    subA: {
        alignItems: 'center',
        height: '100%',
        width: '50%',
    },
    subB: {
      alignItems: 'flex-start',
      height: '100%',
      width: '50%',
    },
    productTitle: {
        fontWeight: '700'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default MarketItem