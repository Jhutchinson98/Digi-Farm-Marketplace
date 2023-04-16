import React, {useState} from 'react';
import {Alert, Button,Modal,Switch,StyleSheet, Pressable, Text, View, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Modal from 'react-responsive-modal';
import { Icon } from 'react-native-elements';
import { Stack, IconButton } from "@react-native-material/core";
import Error from '../components/Error';
import Success from '../components/Success';

const productImages = [require('../assets/yogurt.png'), require('../assets/milkHoney.jpg'), require('../assets/muffin.png')]

function Profile({navigation,route}) {

  const home = () => {
    navigation.navigate('Home')
  }
  const messages = () =>{
    navigation.navigate('Messages')
  }
  //note : Also need to hide the add button when modal is visible
  const [modalVisible, setModalVisible]=useState(false);

  const handlePress = ()=>{
    setModalVisible(true)
  }
  const handleClose = () =>{
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
  
  const handleAddProduct = () => {
    handleClose()
    const data = {
      userEmail: email,
      name: itemName,
      quantity: quantity,
      count: itemCount,
      trade: acceptTrade,
      counter: acceptCounter,
      price: price
    }

    fetch('https://4eab-64-22-249-253.ngrok-free.app/addProduct', {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status == 200){
        setSuccess('Product succesfully added')
        retrieveProducts(email)
      }
    })
    .catch(e => {
      setError('Server error')
    })
  }

  const authorizeToken = (callback) => {
    AsyncStorage.getItem('token').then(token => {
      if(token == null || token == '') {
        navigation.navigate('Open')
        return
      }
      fetch('https://4eab-64-22-249-253.ngrok-free.app/authenticateToken', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ token })
      }).then(res => {
        if (res.status == 200) {
          res.json().then(body => {
            setEmail(body.email)
            setName(body.name)
            retrieveProducts(body.email)
          })
        } else {
          navigation.navigate('Open')
        }
      }).catch(e => {
        navigation.navigate('Open')
      })
    })
  }

  const retrieveProducts = (userEmail) => {
    fetch('https://4eab-64-22-249-253.ngrok-free.app/getProducts', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: userEmail })
    }).then(res => {
      if (res.status == 200){
        res.json().then(prods => {
          setProducts(prods)
        })
      } else {
        setError('There was a problem retrieving the products')
      }
    })
  }
  
  React.useEffect(() => {
    authorizeToken()
  }, [])

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const [itemCount, setItemCount] = React.useState('');
  const [acceptTrade, setAcceptTrade] = React.useState(0);
  const [acceptCounter, setAcceptCounter] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  return (
    <View style={styles.container}>
      {error ? <Error message={error} close={() => setError('')}/> : null }
      {success ? <Success message={success} close={() => setSuccess('')}/> : null }
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
        <View style={{marginLeft:'10%'}}>
          <Image style={styles.marketImage} source={require('../assets/farmer.png')}/>
        </View>
        <View style={{marginRight:"40%"}}>
          <Text style={styles.market}>{ name }</Text>
          <Text style={styles.rating}>Current Rating: 3.875 stars</Text>
        </View>
      </View>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleClose}
          >
          <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>       
              </View>
              <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleAddProduct}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              
              <Pressable
                style={[styles.button2, styles.buttonClose2]}
                onPress={handleClose}>
                <Text style={styles.textStyle2}>Close</Text>
              </Pressable>
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
                    placeholder='Price'
                    keyboardType = 'number-pad'
                    placeholderTextColor={"#7b5536"}
                    onChangeText={(e) => {
                      setPrice(e)
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
              <View style={styles.inputView}>
                <Text style={{color: "#7b5536"}}>Accept counter offers?</Text>
                <TouchableOpacity onPress={() => setAcceptCounter(1)}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: !acceptCounter ? 'red' : 'white', backgroundColor: acceptCounter ? 'green' : 'white', color: acceptCounter ? 'white' : 'black', borderRadius: 10}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setAcceptCounter(0)}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: !acceptCounter ? 'red' : 'white', backgroundColor: !acceptCounter ? 'red' : 'white',color: !acceptCounter ? 'white' : 'black', borderRadius: 10}}>No</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <Text style={{color: "#7b5536"}}>Accept trade offers?</Text>
                <TouchableOpacity onPress={() => setAcceptTrade(1)}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: acceptTrade ? 'green' : 'white', color: acceptTrade ? 'white' : 'black', borderRadius: 10}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setAcceptTrade(0)}>
                  <Text style={{ fontSize: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: !acceptTrade ? 'red' : 'white',color: !acceptTrade ? 'white' : 'black', borderRadius: 10}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </ScrollView>
        </Modal>
        <View>
          <Pressable style={styles.addButton} onPress={() => handlePress()}>
            <Text style={styles.add}>Add +</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.productList}>
        {products.map((product, i) => (
          <TouchableOpacity style={styles.scrollBarItems} key={i}>
            <Image source={productImages[Math.floor(Math.random() * productImages.length)]} style={styles.scrollBarPictures} />
            <View style={styles.scrollBarTextContainer}>
              <Text style={styles.scrollBarTitle}>{product.name}</Text>
              <Text style={styles.scrollBarText}>Quantity: {product.quantity}</Text>
              <Text style={styles.scrollBarText}>Count: {product.count}</Text>
              <Text style={styles.scrollBarText}>Accepting Trade: {product.trade ? 'Yes' : 'No'}</Text>
              <Text style={styles.scrollBarText}>Accepting Counter: {product.counter? 'Yes':'No'}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  add:{
    fontSize:20,
    fontWeight: 400,
  },
  addButton:{
    backgroundColor: "#B9DDA5",
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
  backButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCC88E",
    marginLeft: 15
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:"#643F6E",
    flexDirection:'row'
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:"#FCC88E",
    flexDirection:'row',
    marginLeft: 10

  },
  buttonClose: {
    backgroundColor: "#643F6E",
    flexDirection:'row'
  },
  buttonClose2:{
    backgroundColor:"#FCC88E",
    flexDirection:'row',
  },
  buttonOpen: {
    backgroundColor: "#643F6E",
    flexDirection: 'row'
  },
  buttonView:{
    margin: 10,
    flexDirection: 'row',
    marginTop: "5%",
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    padding: 5,
    width: '105%',
  },
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "-10%",
  },
  container:{
    backgroundColor: "#FCC88E", 
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
  header2:{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    width: '90%',
    marginTop: "5%",
    marginLeft:"5%",
    borderRadius: 20
  },
  homeButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    backgroundColor: "#B9DDA5"
  },
  inputView: {
    borderBottomColor: "#7b5536",
    borderBottomWidth: 1,
    margin: 10,
    flexDirection: 'row',
    marginTop: "5%",
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection:'row',
    padding: 4,
    width: '105%',
  },
  market:{
    fontSize:25,
  },
  marketImage:{
    transform: [{scaleY: 1/6}, {scaleX: 1/6}],
    marginTop: "1.5%",
    marginRight: "-300%"
  },
  marketItem:{
    margin: "10%",
    height: 150,
    width: 150,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
    justifyContent:'center',
    alignContent:'center'
  },
  messageButton:{
    borderRadius: 100,
    borderColor: "#643F6E",
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-18%",
    marginLeft: "80%",
    marginBottom: "1%",
    backgroundColor: "#B9DDA5"
  },
  messageText:{
    color:'#FFFFFF'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    height: "80%",
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
  productList: {
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "60%",
    backgroundColor: "#EBE4F6",
    borderTopWidth: 5,
    borderTopColor: "#EBE4F6",
    borderRadius: 10,
    borderWeight:3,
    borderColor: "#FFFFF",
    height: "56%",
    padding:8
  },
  rating:{
    marginTop:'2%',
  },
  scroll: {
    alignItems: 'center',
    height: "70%",
    width: '100%',
    justifyContent: "flex-start" ,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:"40%"
  },
  scrollBarTitle:{
    fontSize:20,
    flexDirection: 'column',
    marginLeft: "15%",
    marginRight:"10%",
    marginTop: "15%",
    marginRight: "-10%",
    fontSize:20,
    color: 'black',
    fontWeight: 800
  },
  scrollBarItems: {
    backgroundColor: "#B89AE8",
    borderRadius: 20,
    marginBottom: "5%",
    justifyContent: "flex-start",
    flexDirection: "row",
    //marginLeft: "2%",
    //marginRight: "%",
    padding:10
  },
  scrollBarPictures: {
    height: 150,
    width: 150,
    marginTop:'7%',
    marginBottom:'7%',
    marginLeft: "3%",
    borderRadius: 20
  },
  scrollBarText: {
    marginLeft: "15%",
    marginRight:"0%",
    marginBottom:"5%",
    marginTop: "5%",
    marginRight: "-10%",
    fontSize:13,
    color: 'black',
    fontWeight: 600
  },
  scrollBarTextContainer:{
    justifyContent:"center",
    //alignItems:"center",
    marginRight:"13%"
  },
  subA:{
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: "10%",
    marginRight: "40%"
  },
  subB:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginRight:"50%",
    marginLeft: "10%"
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#643F6E"
  },
  textStyle2:{
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    backgroundColor: "#FCC88E"
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