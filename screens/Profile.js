import React, {useState} from 'react';
import {Alert, Modal, Button, StyleSheet, Pressable, Text, View, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import { Stack, IconButton } from "@react-native-material/core";

function Profile({navigation,route}) {

  const home = () => {
    navigation.navigate('Home')
  }
  const messages = () =>{
    navigation.navigate('Messages')
  }
  //note : Also need to hide the add button when modal is visible
  const [modalVisible, setModalVisible]=useState(false);
  const [addVisible, setAddVisible]=useState(true);

  const handlePress = ()=>{
    setAddVisible(false)
    setModalVisible(true)
  }
  const handleClose = () =>{
    setAddVisible(true)
    setModalVisible(false)
  }

  const [photo, setPhoto] = React.useState(null);
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        //this.setState({ photo: response })
        setPhoto(response)
      }
    })
  };

  const [price, setPrice] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [itemCount, setItemCount] = React.useState('');
  const [acceptTrade, setAcceptTrade] = React.useState(false);
  const [acceptCounter, setAcceptCounter] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <View style={styles.homeButton}>
            <TouchableOpacity onPress={home}>
              <Icon name="home" />
            </TouchableOpacity>
          </View>
          <View style={styles.messageButton}>
            <TouchableOpacity onPress={messages}>
              <Icon name="message" />
            </TouchableOpacity>
          </View>
          </View>
        </View>

        <View style={styles.header2}>
          <View >
            <Image style={styles.marketImage} source={require('../assets/cheese.png')}/>
          </View>
          <View style={styles.subB}>
            <Text style={styles.market}>Your Marketplace</Text>
            <Text style={styles.rating}>Current Rating: 3.5 stars</Text>
          </View>
        </View>

        <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
            />
         )}
        {/*<Button style={{color:"#7b5536"}}title="Choose Photo" onPress={this.handleChoosePhoto} />*/}
      </View>
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
              onPress={handleClose}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      
      <View>
        {addVisible && (
        <Pressable style={styles.addButton} visible={addVisible} onPress={() => handlePress()}>
          <Text style={styles.add}>Add +</Text>
        </Pressable>)}
      </View>
      </View>


      <ScrollView style={styles.productList}>
        <TouchableOpacity style={styles.scrollBarItems} >
          <Image source={require('../assets/yogurt.png')} style={styles.scrollBarPictures} />
          <View style={styles.scrollBarTextContainer}>
          <Text style={styles.scrollBarText}>Churned Yogurt</Text>
          <Text style={styles.scrollBarText}>Quantity: 10</Text>
          <Text style={styles.scrollBarText}>Count: 1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollBarItems} >
          <Image source={require('../assets/muffin.png')} style={styles.scrollBarPictures} />
          <View style={styles.scrollBarTextContainer}>
          <Text style={styles.scrollBarText}>Baked Muffins</Text>
          <Text style={styles.scrollBarText}>Quantity: 4</Text>
          <Text style={styles.scrollBarText}>Count: 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollBarItems} >
          <Image source={require('../assets/milkHoney.jpg')} style={styles.scrollBarPictures} />
          <View style={styles.scrollBarTextContainer}>
          <Text style={styles.scrollBarText}>Fresh Cow Milk</Text>
          <Text style={styles.scrollBarText}>Quantity: 6</Text>
          <Text style={styles.scrollBarText}>Count: 1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollBarItems} >
          <Image source={require('../assets/salad.jpeg')} style={styles.scrollBarPictures} />
          <View style={styles.scrollBarTextContainer}>
          <View style={styles.scrollBarTextContainer}>
          <Text style={styles.scrollBarText}>Chopped Salad</Text>
          <Text style={styles.scrollBarText}>Quantity: 12</Text>
          <Text style={styles.scrollBarText}>Count: 2</Text>
          </View>
          </View>
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
    //marginTop: "15%",
    marginLeft: 15,
    backgroundColor: "#FCC88E"
  },
  container:{
    backgroundColor: "#B9DDA5"
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
  messageButton:{
    borderRadius: 100,
    borderColor: "#643F6E",
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    //justifyContent: "flex-start",
    marginTop: "-18%",
    marginLeft: "80%",
    marginBottom: "1%",
    backgroundColor: "#FCC88E"

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9%',
    width: '85%',
    marginVertical: '2%',
    marginTop: '9%',
    marginLeft: '7%',
    borderRadius: 50
  },
  scrollBarTextContainer:{
    justifyContent:"center",
    alignItems:"center",
  },
  marketImage:{
    //justifyContent:'flex-start',
   // marginLeft: '50%',
    transform: [{scaleY: 1/4}, {scaleX: 1/4}],
    //marginRight: "8%",
    marginTop: "1.5%",
    //marginRight: "30%"
    //marginLeft: "40%",
    marginRight: "-300%"
    //marginRight: '50%',
    //marginBottom: '50%',
    //width:'%'
  },
  header2:{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    width: '100%',
    //marginVertical: '2%',
    marginTop: "5%",
    marginRight: "5%",
    borderRadius: 20
  },
  subA:{
    justifyContent: 'flex-start',
    height: '100%',
    //width: '50%',
    marginTop: "10%",
    //marginLeft: "%" ,
    marginRight: "40%"
  },
  subB:{
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginRight:"50%"
  },
  market:{
   fontSize:30,
   //fontFamily: 'OpticalFiber-2VWo',
  },
  rating:{
    marginTop:'2%',
  },
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  add:{
    fontSize:20,
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
    height: "40%",
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
    backgroundColor: "#FCC88E",
    width: "50%",
    borderRadius: 15,
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginTop:"5%",
    padding: 10,
    marginRight: "5%"
  },
  
  productList: {
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "60%",
    backgroundColor: "#EBE4F6",
    borderRadius: 10,
    borderWeight:3,
    borderColor: "#FFFFF",
    height: "56%",
    padding:7
  },

  marketItem:{
    margin: "10%",
    //width: "auto",
    //height: "100%"
    height: 150,
    width: 150,
    marginLeft: 10,
    marginTop: 10,
    //backgroundColor: "#FCC88E",
    borderRadius: 20,
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:'#F194FF'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: "#643F6E",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#643F6E"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputView: {
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
    width: '105%',
},
scrollBarPictures: {
  height: 150,
  width: 150,
  marginLeft: 10,
  //marginTop: 10,
},
scrollBarText: {
  marginLeft: "15%",
  marginTop: "15%"
},
scrollBarItems: {
  backgroundColor: "#B89AE8",
  borderRadius: 20,
  marginBottom: "5%",
  justifyContent: "flex-start",
  flexDirection: "row",
  marginLeft: "2%",
  marginRight: "2%",
  padding:10

},
topButtonHeader:{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 40
  },

})

export default Profile