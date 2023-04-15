import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

function Profile({navigation,route}) {

  const home = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
            <TouchableOpacity onPress={home}>
              <View style={styles.homeButton}>
                <Text>Home</Text>
              </View>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  homeButton: {
    borderRadius: 100,
    //font: 
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80%",
    marginLeft: "10%",
    backgroundColor: "#FCC88E"
  }
})

export default Profile