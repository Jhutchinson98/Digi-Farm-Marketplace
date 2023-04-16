import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, } from 'react-native';

const ProfileCard = props => {
  return (
    <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.nameText}>{props.name}</Text>
            <View style={styles.ratings}>
                <Text style={styles.ratingText}>Rating:</Text>
                <Image source={require('../assets/filledstar.png')} style={styles.star}/>
                <Image source={require('../assets/filledstar.png')} style={styles.star}/>
                <Image source={require('../assets/filledstar.png')} style={styles.star}/>
                <Image source={require('../assets/filledstar.png')} style={styles.star}/>
                <Image source={require('../assets/emptystar.png')} style={styles.star}/>
            </View>
        </View>
        <TouchableOpacity style={styles.profilePic}>
            <Image source={require('../assets/farmer.png')} style={styles.picSize} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        color: "#7b5536",
        backgroundColor: "#FFFFE0",
        height: 150,
        width: '100%',
        borderRadius: 15,
        padding: 2
    },
    info: {
        paddingLeft: 10,
        paddingTop: 10,
        justifyContent: 'flex-start',
        width: '70%'
    },
    nameText: {
        fontSize: 36
    },
    ratings: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        fontSize: 24
    },
    star: {
        height:25,
        width: 25,
        marginHorizontal: 5,
        marginTop: 5
    },
    profilePic: {
        justifyContent: 'flex-start',
        alignContent: 'flex-end',
    },
    picSize: {
        height: 75,
        width: 75,
        marginLeft: 15,
        marginTop: 10
    },
})

export default ProfileCard