import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
  } from 'react-native';
import Error from '../components/Error';


function Login({navigation, route}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  // Checks username and password to log them in.
  const LogCall = () => {
    // If correct, reroutes user to Home. 
    // Otherwise, tells user that username or password is incorrct
    const user = {
      email,
      password
    }

    fetch('https://4eab-64-22-249-253.ngrok-free.app/login', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    .then(res => {
      if (res.status == 200) {
        res.json().then(body => {
          AsyncStorage.setItem('token', body.token).then(() => {
            navigation.navigate('Home')
          })
        })
      } 
      else {
        setError('Email and password do not match')
      }
    })
    .catch(() => setError('Server Error'))
      // Backdoor
      // navigation.navigate('Home')
  }

  const backToOpen = () => {
    navigation.navigate('Open')
  }

  const createAccount = () => {
    navigation.navigate('CreateAccount')
  }

  return (
    <View style={styles.container}>
      {error ? <Error message={error} close={() => setError('')}/> : null }
      <View style={styles.titleContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
      </View>    
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7B5536"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7B5536"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}/> 
      </View> 
      <TouchableOpacity style={styles.forgot_button} onPress={() => setError('You probably shouldn\'t do that')}>
        <Text style={styles.loginText}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={LogCall} disabled={!email || !password}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.backBtn} onPress={backToOpen}>
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    color: "#7b5536",
    backgroundColor: "rgba(255, 222, 144, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
    width: '50%',
    marginTop: 15
  },
  input: {
    color: "#7b5536",
    textAlign: 'center',
    fontWeight:"500",
    padding:1,
    fontSize:18, 
  },
  forgot_button: {
    height: 30,
    marginBottom: 0,
    marginTop: 20
  },
  loginText:{
    color: "#7b5536",
  },
  title: {
    color: "#7b5536",
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 400
   },
   titleContainer: {
    marginBottom: 100,
   },
   loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    backgroundColor: "#FCC88E",
  },
  backBtn: {
    width: "50%",
    borderRadius: 10, 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    backgroundColor: "#FCC88E",
  },
  logo: {
    position: 'absolute',
    transform: [{scaleY: 1/4}, {scaleX: 1/4}],
    top: -700,
    left: -665,
    marginBottom:"3%"
  },
});


export default Login