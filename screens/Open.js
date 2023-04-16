import React from 'react'
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

function Open({navigation,route}){
  
  const login = () => {
    navigation.navigate('Login')
  }

  const createAccount = () => {
    navigation.navigate('CreateAccount')
  }
  
  return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/veggiebasket.png')} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.80}}>
          <Image source={require('../assets/logo.png')} style={styles.logo}/>
          {/* <Text style={styles.marketPlace}>DigiFarm Marketplace</Text> */}
          <TouchableOpacity style={styles.loginBtn} onPress={login}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.createBtn} onPress={createAccount}>
            <Text style={styles.loginText}>Create An Account</Text>
          </TouchableOpacity> 
          </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width:'100%',
    height:'100%',
    //opacity:'15%'
  },
  inputView: {
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
    width: '50%',
  },
  input: {
    color: "#7b5536",
    textAlign: 'center'
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    //font: 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "110%",
    marginLeft: "10%",
    backgroundColor: "#FCC88E",
  },
  createBtn: {
    width: "80%",
    //font:
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginLeft:"10%",
    backgroundColor: "#B9DDA5",
  },
  marketPlace: {
    //width: "80%",
    //font:
    borderRadius: 10,
    height: 50,
    fontSize: 30,
    letterSpacing: 2,
    textAlignVertical: 'top',
    fontWeight: '800',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
    color: '#463629',
    //marginLeft:"32.5%",
    //backgroundColor: "#B9DDA5",
  },
  logo: {
    position: 'absolute',
    transform: [{scaleY: 1/4}, {scaleX: 1/4}],
    top: -500,
    left: -458
},
});


export default Open