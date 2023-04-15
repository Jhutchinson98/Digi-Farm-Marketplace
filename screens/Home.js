import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { Icon } from 'react-native-elements';
import { Stack, IconButton } from "@react-native-material/core";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function HomeScreen({navigation,route}) {

  const ProfileCard = () => {
    navigation.navigate('Profile')
  }

  const Market = () => {
    navigation.navigate('Market')
  }

  const Favorites = () =>{
    navigation.navigate('Favorites')
  }

  return (
    <View style={styles.container}>
    {/* <ProfileCard/> */}

        {/* Header w/ greeting, location, and profile*/}
        <View style={styles.header}>
          <View style={styles.subA}>
            <Text style={styles.danny}>Hi, Danny</Text>
            <Text style={styles.location}>Springfield, MO</Text>
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
          <TextInput placeholder='Search for a Marketplace'/>
        </View>
        
        {/* Top horizontal scrollbar */}
        <View style={styles.scrollBar}>
          <ScrollView horizontal={true}>
            <TouchableOpacity>
              <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bottom verticle scrollbar header area*/}
        <View style={styles.local}>
          <View style={styles.subLocal}>
            <View style={styles.subA}>
              <Text>Local Markets</Text>
            </View>
            <View style={styles.seeAll}>
              <TouchableOpacity>
                <Text>See All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom verticle scrollbar */}
          <View style={styles.localScroll}>
            <ScrollView>
              <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
                <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
                <Text style={styles.scrollBarText}>Marketplace 1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
                <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
                <Text style={styles.scrollBarText}>Marketplace 2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={Market} style={styles.scrollBarItems}>
                <Image source={require('../assets/farmer.png')} style={styles.scrollBarPictures}/>
                <Text style={styles.scrollBarText}>Marketplace 3</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.nav}>
          <View>
            <TouchableOpacity>
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
  container: {
    flex: 1,
    color: "#7b5536",
    backgroundColor: "#B9DDA5",
    alignItems: "center",
    justifyContent: "center",
  },
  // Header
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    width: '85%',
    //marginVertical: '2%',
    marginTop: "10%",
    borderRadius: 20
  },
  danny:{
    fontSize:30,
    //fontFamily: 'OpticalFiber-2VWo',
    marginLeft: '5%'
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
  location:{
    marginTop:'2%',
    marginLeft: '5%'
  },
  subA: {
    justifyContent: 'flex-start',
    height: '100%',
    width: '50%',
    marginTop: "10%",
    marginLeft: "10%"
  },
  subB: {
    alignItems: 'flex-end',
    height: '100%',
    width: '50%',
    marginTop: "10%",
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
  //Search
  search: {
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5%',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 100
  },
  // Horizontal-Scroll
  scrollBar: {
    backgroundColor: '#ffffe0',
    height: '20%',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 20
  },
  
  scrollBarPictures: {
    height: 150,
    width: 150,
    marginLeft: 5,
    marginTop: 5,
  },
  scrollBarText: {
    marginLeft: "15%",
    marginTop: "15%"
  },
  scrollBarItems: {
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
    marginBottom: "5%",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
  },
  // V-Scroll
  local: {
    backgroundColor: '#ffffe0',
    justifyContent: 'center',
    //alignItems: 'center',
    height: '40%',
    width: '85%',
    //marginVertical: '2%',
    borderRadius: 20
  },
  subLocal: {
    //display: 'flex',
    flexDirection: 'row',
    marginBottom: "10%"
  },
  // Verticle scroll ***Need to get scrollbar to display 2 items side by side***
  localScroll: {
   // justifyContent: 'center',
    alignItems: 'center',
    height: "70%",
    width: '100%',
    justifyContent: "flex-start" ,
    flexDirection: "row",
    flexWrap: "wrap",
    //marginTop:"5%"
  },
  // Nav
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '8%',
    width: '85%',
    //marginVertical: '1%',
    marginTop: 5,
    borderRadius: 100
  },
  // see-all button
  seeAll: {
    alignItems: 'center',
    height: '40%',
    width: '20%',
    marginTop: "10%",
    backgroundColor: "#FCC88E",
    borderRadius: 20
  
  }
})

export default HomeScreen