import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default ({navigation}) => {

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    
    const backToOpen = () => {
        navigation.navigate('Open')
    }

    const navigateToLogin = () => {
        navigation.navigate('Login')
    }

    const create = () => {

        //console.log("Creating Profile...")
        if(validate()){
            //http request to server
            //console.log("Validated!") 
            
            const data = {
                email: email,
                name: name,
                password: password
            }

            fetch("https://4eab-64-22-249-253.ngrok-free.app/createUser", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then((res) => {
                if (res.status === 200){
                    navigateToLogin()
                }
                else{
                    console.log("server error")
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const validate = () => {
        if(password !== confirmPassword) return false
        if(!emailRegex.test(email)) return false
        return true
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/slicedfruit.png')} style={styles.fruit}/>
            <Image source={require('../assets/italianveggies.png')} style={styles.veggies}/>
            <View style={styles.titleContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
            </View>

            
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setEmail(e)
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Marketplace Name'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setName(e);
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setPassword(e);
                    }}
                />  
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) =>{
                        setConfirmPassword(e);
                    }}
                />   
             </View>    
    
            <TouchableOpacity style={styles.createButton} onPress={create} disabled={!email || !name || !password || !confirmPassword}>
                <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={backToOpen}>
                <Text style={styles.createText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#7b5536",
        backgroundColor: "rgba(255, 222, 144, 0.3)",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        borderBottomColor: "#7b5536",
        //backgroundColor: "#7b5536",
        borderBottomWidth: 1,
        margin:0,
        padding: 10,
        width: '50%',
    },
    input: {
        color: "#7b5536",
        textAlign: 'center',
        marginTop:"5%",
        fontWeight:"500",
        padding:1,
        fontSize:18, 
        marginTop: "1%"
    },
    title: {
        color: "#7b5536",
        fontSize: 38,
        letterSpacing: 2,
        textAlign: 'center',
        fontWeight: 400
    },
    titleContainer: {
        marginBottom: 70,
        borderBottomColor: "#7b5536",
        borderBottomWidth: 1,
        marginTop:"10%",
    },
    createButton: {
        backgroundColor: '#B9DDA5',
        width: 100,
        paddingVertical: 10,
        marginTop: 50,
        borderRadius: 10,
    },
    backButton:{
        backgroundColor: '#FCC88E',
        width: 100,
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    createText: {
        textAlign: 'center',
    },
    fruit: {
        position: 'absolute',
        transform: [{scaleY: 1/4}, {scaleX: -1/4}],
        top: -220,
        left: -520,
        opacity:0.75
    },
    veggies: {
        position: 'absolute',
        opacity:0.75,
        transform: [{scaleY: 2/3}, {scaleX: 2/3}],
        top: 360,
        left: 160
    },
    cheese:{
        position:'absolute',
        transform:[{scaleY: 1/2}, {scaleX:1/2}],
        top: -170,
        left: 120
    },

    modal:{
        position: 'absolute'
    },

    centeredView: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      logo: {
        position: 'absolute',
        transform: [{scaleY: 1/4}, {scaleX: 1/4}],
        top: -700,
        left: -665,
        marginBottom:"10%"
    },
})