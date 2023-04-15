import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

function ProfileCard(props) {
  return (
    <View>
        <TouchableOpacity>
            <Image source={require('../assets/farmer.png')} style={styles.scrollBarItems}/>
         </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        color: "#7b5536",
        backgroundColor: "#0c0af9",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        width: '100%'
    },
    scrollBarItems: {
      height: 50,
      width: 50,
      marginLeft: 15,
      marginTop: 10
    },
})

export default ProfileCard