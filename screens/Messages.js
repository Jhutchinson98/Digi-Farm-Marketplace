import { TextInput } from '@react-native-material/core';
import React, {useState} from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

function Messages({navigation, route}) {

  const Market = () => {
    navigation.goBack()
    //const [modalVisible, setModalVisible] = React.useState(false);
  }

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <View style={styles.subA}>
          <TouchableOpacity onPress={Market}>
            <View style={styles.backButton}>
                <Text>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.subB}>
          <Image source={require('../assets/farmer.png')} style={styles.farmer}/>
        </View>
      </View>
      
      {/* Message History */}
      <View style={styles.chat}>
        <View style={styles.receive}>
          <Text style={styles.font}>Hello! Did you still have the Churned Yogurt for sale?</Text>
        </View>
        <View style={styles.send}>
          <Text style={styles.font}>Yes I did! When would you like to meet up?</Text>
        </View>
      </View>

      {/* Enter Message */}
      <View style={styles.inputView}>
        <TextInput 
        style={styles.input}
        placeholder='Begin Typing...'
        multiline={true}
        />
        
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          backgroundColor: "#B9DDA5",
          alignItems: "center",
          justifyContent: "center",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '85%',
    marginVertical: '2%'
    ,borderRadius: 40
  },
  subA: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    width: '50%',
  },
  farmer: {
    position: 'relative',
    left:215,
    top: '2%',
    transform: [{scaleY: 1/7}, {scaleX: 1/7}],
  },
  subB: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    width: '50%',
    marginRight: 15
  },
  chat: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    height: '70%',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 20
  },
  receive: {
    justifyContent: 'flex-start',
    alignItems: "center",
    height: '22%',
    width: '40%',
    marginLeft: '5%',
    marginTop: "5%",
    backgroundColor: "#58AE54",
    borderRadius: 20
  },
  send: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '18%',
    width: '35%',
    marginLeft: '10%',
    marginTop: "30%",
    backgroundColor: "#468C43",
    borderRadius: 20
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    height: '6%',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 20
  },
  backButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCC88E",
    marginLeft: 15
  },
  other: {
    width: '25%',
  },
  type: {
    width: '75%',
  },
  inputView: {
    margin: 10,
    padding: 5,
    width: '85%',
},
input: {
    color: "#7b5536",
    textAlign: 'center',
},
inputContainer: {
    flex: 1,
    color: "#7b5536",
    backgroundColor: "rgba(255, 222, 144, 0.3)",
    alignItems: "center",
    justifyContent: "center",
},
font: {
  fontSize:18,
  color: "white",
  margin: 10
}

})

export default Messages