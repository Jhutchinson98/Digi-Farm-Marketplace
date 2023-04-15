import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
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

    const create = () => {
        if(validate()){
            //http request to server 
            
            const data = {
                email: email,
                name: name,
                password: password
            }
            
            //console.log(data)
            
        }
    }

    const validate = () => {
        if(password !== confirmPassword) return false
        if(!emailRegex.test(email)) return false
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/slicedfruit.png')} style={styles.fruit}/>
            <Image source={require('../assets/italianveggies.png')} style={styles.veggies}/>
            <Image source={require('../assets/cheese.png')} style={styles.cheese}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>DigiFarm</Text>
                <Text style={styles.title}>Marketplace</Text>
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
        borderBottomWidth: 1,
        margin: 10,
        padding: 5,
        width: '50%',
    },
    input: {
        color: "#7b5536",
        textAlign: 'center'
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
        borderBottomWidth: 1
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
        left: -520
    },
    veggies: {
        position: 'absolute',
        transform: [{scaleY: 2/3}, {scaleX: 2/3}],
        top: 360,
        left: 160
    },
    cheese:{
        position:'absolute',
        transform:[{scaleY: 1/2}, {scaleX:1/2}],
        top: -170,
        left: 120
    }
})