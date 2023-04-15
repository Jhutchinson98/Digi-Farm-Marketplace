import React from 'react'
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


function Login({navigation, route}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [marketplace, setMarketplace] = useState('');

    // Checks username and password to log them in.
    const LogCall = () => {
        // If correct, reroutes user to Home. 
        // Otherwise, tells user that username or password is incorrct
        if (true) {
            navigation.navigate('Home')
        }
    }

    const backToOpen = () => {
      navigation.navigate('Open')
    }

    const createAccount = () => {
        navigation.navigate('CreateAccount')
    }

   return (
    <View style={styles.container}>
             <View style={styles.titleContainer}>
                <Text style={styles.title}>DigiFarm</Text>
                <Text style={styles.title}>Marketplace</Text>
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
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={LogCall}>
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
  },
  input: {
    color: "#7b5536",
    textAlign: 'center'
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    marginTop: 30
  },
  title: {
    color: "#7b5536",
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 400
   },
   titleContainer: {
    marginBottom: 50,
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1
   },
   loginBtn: {
    width: "80%",
    borderRadius: 10,
    //font: 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    backgroundColor: "#FCC88E",
  },
  backBtn: {
    width: "80%",
    borderRadius: 10,
    //font: 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    backgroundColor: "#FCC88E",
  },
});


export default Login