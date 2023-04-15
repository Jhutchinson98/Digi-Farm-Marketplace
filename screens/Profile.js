import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable, Text, View, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

function Profile({navigation,route}) {

  const home = () => {
    navigation.navigate('Home')
  }
  const messages = () =>{
    navigation.navigate('Messages')
  }
  //note : Also need to hide the add button when modal is visible
  const [modalVisible, setModalVisible]=useState(false);

  const [photo, setPhoto] = React.useState(null);
  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const [price, setPrice] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [itemCount, setItemCount] = React.useState('');
  const [acceptTrade, setAcceptTrade] = React.useState(false);
  const [acceptCounter, setAcceptCounter] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const items = [
     {name: "item1", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item2", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item3", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item4", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item5", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item6", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item7", content: <Image source={require('../assets/farmer.png')}/>},
     {name: "item8", content: <Image source={require('../assets/farmer.png')}/>},
    
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.homeButton}>
            <TouchableOpacity onPress={home}>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.messageButton}>
            <TouchableOpacity onPress={messages}>
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.inputView}>
                <TextInput
                    style={styles.modalText}
                    placeholder='ItemName'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setItemName(e)
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.modalText}
                    placeholder='Quantity Available'
                    keyboardType = 'number-pad'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setQuantity(e)
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.modalText}
                    placeholder='Count per Item'
                    keyboardType = 'number-pad'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                        setItemCount(e)
                    }}
                />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.add}>Add +</Text>
      </Pressable>
      </View>
      <ScrollView style={styles.productList}>
        <TouchableOpacity>
          <Image source={require('../assets/farmer.png')} style={styles.marketItem} />
          <Image source={require('../assets/farmer.png')} style={styles.marketItem} />
        </TouchableOpacity>
      </ScrollView>
    
      <View>
        
      </View>
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
    marginTop: "15%",
    marginLeft: "5%",
    backgroundColor: "#FCC88E"
  },
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  add:{
    fontSize:40,
    fontWeight: 300,
  },
  messageText:{
    color:'#FFFFFF'
  },
  modalView: {
    margin: 20,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    height: "60%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
  addButton:{
    backgroundColor: "rgba(255, 222, 144, 0.7)",
    width: "50%",
    borderRadius: "20%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginTop:"5%",
    marginRight: "5%"
  },
  messageButton:{
    borderRadius: 100,
    borderColor: "#643F6E",
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    //justifyContent: "flex-start",
    marginTop: "-15%",
    marginLeft: "80%",
    marginBottom: "1%",
    backgroundColor: "#643F6E"

  },
  productList: {
    marginLeft: "7%",
    marginRight: "7%",
    marginBottom: "60%",
    marginTop: "15%",
    backgroundColor: "#D3D3D3" 
  },
  header:{
    backgroundColor: "#B9DDA5",
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  marketItem:{
    margin: "10%",
    //width: "auto",
    //height: "100%"

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
  inputView: {
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1,
    margin: 10,
    padding: 5,
    width: '105%',
},

})

export default Profile