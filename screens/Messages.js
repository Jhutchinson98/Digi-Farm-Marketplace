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
        <Image
              source={require('../assets/farmer.png')} 
              style={styles.farmer}/>
        </View>
      </View>
      <View style={styles.chat}>
        <View style={styles.receive}>
          <Text>Messages</Text>
        </View>
        <View style={styles.send}>
          <Text>Messages</Text>
        </View>
      </View>
      <View style={styles.text}>
        <View style={styles.other}></View>
        <View style={styles.type}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          color: "#7b5536",
          backgroundColor: "#fff",
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
    width: '50%'
  },
  chat: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    height: '70%',
    width: '85%',
    marginVertical: '2%'
  },
  receive: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: '97%',
    width: '47%',
    marginLeft: '3%',
    marginBotton: '3%'
  },
  send: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '97%',
    width: '47%',
    marginRight: '3%',
    marginBotton: '3%'
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    height: '10%',
    width: '85%',
    marginVertical: '2%'
  },
  backButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCC88E"
  },
  other: {
    width: '25%',
  },
  type: {
    width: '75%',
  }
})

export default Messages