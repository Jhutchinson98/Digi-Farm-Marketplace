import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, Modal } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { Icon } from 'react-native-elements';
import { Stack, IconButton } from "@react-native-material/core";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function HomeScreen({navigation,route}) {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [modal, setModal]= useState(false)

  const ProfileCard = () => {
    navigation.navigate('Profile')
  }

  const goToMarket = (market) => {
    navigation.navigate('Market', market)
  }

  const Favorites = () =>{
    navigation.navigate('Favorites')
  }

  const handlePress = ()=>{
    setModalVisible(true)
  }
  const handleClose = () =>{
    setModalVisible(false)
  }
  const handleSearch = (text) => {
    setSecondModalVisible(true)
  }


  const [modalVisible, setModalVisible]=useState(false);
  const [secondModal,setSecondModalVisible]=useState(false);

  const authenticateToken = () => {
    AsyncStorage.getItem('token')
    .then(token => {
      fetch('https://4eab-64-22-249-253.ngrok-free.app/authenticateToken', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ token })
      })
      .then(res => {
        if (res.status == 200) {
          res.json().then(body => {
            setEmail(body.email)
            setName(body.name)
          })
        } 
        else {
          navigation.navigate('Open')
        }
      })
      .catch(e => console.log(e))
    })
  }

  const retrieveMarkets = () => {
    fetch('https://4eab-64-22-249-253.ngrok-free.app/getMarkets')
    .then(res => {
      if (res.status == 200) {
        res.json().then(m => setMarkets(m))
      }else{
        console.log('server error')
      }
    })
    .catch(e => console.log('server error: ', e))
  }

  React.useEffect(() => {
    authenticateToken()
    retrieveMarkets()
  }, [])

  const [markets, setMarkets] = React.useState([]);

  return (
    <View style={styles.container}>
      
     {/* Header w/ greeting, location, and profile*/}
      <View style={styles.header}>
        <View style={styles.subA}>
          <Text style={styles.danny}>{name}</Text>
        </View>
        <View style={styles.subB}>
          <TouchableOpacity onPress={ProfileCard}>
            <View>
              <Image
              source={require('../assets/farmer.png')} 
              style={styles.farmer}/>
              <Text>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
        
      {/* Search for marketplace bar */}
      <View style={styles.search}>
        <Icon name={"search"}/>
        <TextInput placeholder='Search for a Marketplace' onSubmitEditing={(event) => handleSearch(event.text)} />
      </View>

      <View>
        <Modal visible={secondModal} style={styles.modalContainer} animationType='fade'>
          <View style={{flex: 1, height: "80%",justifyContent: 'center', alignItems: 'center'}}>
            <View style={{backgroundColor: 'white', padding: 20}}>
              <Text>No marketplaces found with that name</Text>
              <TouchableOpacity style={{borderRadius:10}} onPress={() => setSecondModalVisible(false)}>
                <Text style={styles.dismissButton}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
        
      {/* Top horizontal scrollbar */}
      <View style={styles.sideScrollFrame}>

        <View style={styles.scrollBar}>
          
          <ScrollView horizontal={true}>
            <TouchableOpacity>
              <Image source={require('../assets/cow.png')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/greenonions.jpeg')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/salad.jpeg')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Bottom verticle scrollbar header area*/}
      <View style={styles.local}>
        <View style={styles.subLocal}>
          <View style={styles.subA}>
            <Text style={{fontSize: 25, marginBottom:"-10%", marginTop:"-13%"}}>Local Markets</Text>
          </View>
        </View>

        {/* Bottom verticle scrollbar */}
        <View style={styles.localScroll}>
          <ScrollView>
            {markets.map((market, i) => (
              <TouchableOpacity onPress={() => goToMarket(market)} style={styles.scrollBarItems} key={i}>
                <Image source={require('../assets/oldman.jpeg')} style={styles.scrollBarPictures}/>
                <Text style={styles.scrollBarText}>{market.name}</Text>
              </TouchableOpacity>
            ))}
            {/* <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
              <Image source={require('../assets/oldman.jpeg')} style={styles.scrollBarPictures}/>
              <Text style={styles.scrollBarText}>Old Greg's Market</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
              <Image source={require('../assets/Vanilla3.jpg')} style={styles.scrollBarPictures}/>
              <Text style={styles.scrollBarText}>Ice Farms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
              <Image source={require('../assets/backyard.jpg')} style={styles.scrollBarPictures}/>
              <Text style={styles.scrollBarText}>Backyard Garden</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.nav}>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleClose}
          >
            <View style={styles.modal}>
              <View>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
              <ScrollView 
                maximumZoomScale={5}
                minimumZoomScale={1}
                bouncesZoom={true}
                horizontal={true}
                >
                <Image source={require('../assets/Springfield-Map.jpg')} />
              </ScrollView>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => handlePress()}>
            <Icon name="map" />
            <Text>Nearby</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={Favorites}>  
            <Icon name="bookmark" />
            <Text>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCC88E"
  },
  modalContainer: {
    height: 150,
    width: '80%',
    backgroundColor: '#ffffe0',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '50%',
  },
  container: {
    flex: 1,
    color: "#7b5536",
    backgroundColor: "#B9DDA5",
    alignItems: "center",
    justifyContent: "center",
  },
  danny:{
    fontSize:30,
    marginLeft: '5%',
  },
  dismissButton:{
    backgroundColor: "#B9DDA5",
    width: "50%",
    borderRadius: 15,
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginTop:"10%",
    padding: 10,
    marginRight: "5%",
    borderRadius:10
  },
  farmer: {
    position: 'relative',
    left:200,
    right: 0,
    top: -230,
    bottom: 0,
    transform: [{scaleY: 1/7}, {scaleX: 1/7}],
    marginRight: "8%",
    marginTop: "1.5%"
  },
  // Header
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    width: '90%',
    marginTop: "10%",
    borderRadius: 20
  },
  // V-Scroll
  local: {
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    height: '40%',
    width: '90%',
    borderRadius: 20
  },
  // Verticle scroll
  localScroll: {
    alignItems: 'center',
    height: "70%",
    width: '100%',
    justifyContent: "flex-start" ,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  location:{
    marginTop:'2%',
    marginLeft: '5%'
  },
  map: {
    height: '80%',
    width: '90%',
    backgroundColor: 'red',
  },
  mapPic: {
    height: 1000,
    width: 300,
  },
  modal: {
    height: '80%',
    width: '80%',
    backgroundColor: '#B9DDA5',
    justifyContent: 'center',
    alignItems: 'center',
    left: '10%',
    top: '8%',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#B9DDA5'
  },
  // Nav
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '8%',
    width: '90%',
    marginTop: 5,
    borderRadius: 100
  },
  profileButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80%",
    marginLeft: "10%",
    backgroundColor: "#FCC88E"
  },
  // Horizontal-Scroll
  scrollBar: {
    backgroundColor: '#ffffe0',
    height: '90%',
    width: '95%',
    marginHorizontal: '2%',
    fadingEdgeLength: "1%",
    marginVertical: '2%',
    borderRadius: 20,
  },
  scrollBarItems: {
    backgroundColor: "#EBE4F6",
    borderRadius: 20,
    marginBottom: "5%",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
  },
  scrollBarPictures: {
    height: 150,
    width: 150,
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 20
  },
  scrollBarText: {
    marginLeft: "5%",
    marginTop: "15%",
    fontSize: 18,
    fontWeight: 'bold'
  },
  //Search
  search: {
    backgroundColor:'#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5%',
    width: '90%',
    marginTop: '2%',
    borderRadius: 100,
    flexDirection: "row"
  },
  // see-all button
  seeAll: {
    alignItems: 'center',
    height: '40%',
    width: '20%',
    marginTop: "10%",
    backgroundColor: "#FCC88E",
    borderRadius: 20
  },
  sideScrollFrame: {
    backgroundColor: '#ffffe0',
    height: '20%',
    width: '90%',
    marginHorizontal: '2%',
    fadingEdgeLength: "1%",
    marginVertical: '2%',
    borderRadius: 20
  },
  subA: {
    justifyContent: 'flex-start',
    height: '100%',
    width: '50%',
    marginTop: "10%",
    marginLeft: "10%",
  },
  subB: {
    alignItems: 'flex-end',
    height: '100%',
    width: '50%',
    marginTop: "10%",
  },
  subLocal: {
    flexDirection: 'row',
    marginBottom: "10%"
  },
})

export default HomeScreen