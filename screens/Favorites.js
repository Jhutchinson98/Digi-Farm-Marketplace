import React from 'react'
import { StyleSheet, Text,TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Stack, IconButton } from "@react-native-material/core";

function Favorites({navigation,route}) {
  const home = () => {
    navigation.navigate('Home')
  }
  const profile=()=>{
    navigation.navigate('Profile')
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subA}>
          <TouchableOpacity onPress={home}>
            <View style={styles.backButton}>
              <Icon name="home" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.subB}>
          <TouchableOpacity onPress={profile}>
            <Image source={require('../assets/farmer.png')} style={styles.farmer}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.favoritesBox}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Your Favorite Markets</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.par}>There's nothing here yet.</Text>
          <Text style={styles.par}>Visit marketplaces to favorite one.</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    display: 'flex',
    fontWeight: 300,
    justifyContent:'center',
    alignContent:'center',
    color: "#7b5536"
  },
  contentBox:{
    justifyContent: 'center',
    flexDirection:'column',
    alignElements:'center',

  },
  homeButton: {
    borderRadius: 100,
    //font: 
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: "15%",
    marginLeft: 40,
    marginTop: 50,
    backgroundColor: "#FCC88E"
  },
  par:{
    marginLeft:'15%'
  },
  titleBox:{
    marginTop:"15%",
    marginLeft:"8%",
    height: 'auto',
    width: '85%',
    marginVertical: '2%',
    borderRadius: 100,
    //backgroundColor: "#D3D3D3"
  },
  container:{
    flex: 1,
    justifyContet:'center',
    alignContent: 'center',
    backgroundColor:  "#B9DDA5"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffe0',
    height: '10%',
    width: '85%',
    marginBottom: '2%',
    borderRadius: 40,
    marginTop: "10%",
    marginLeft: "7%"
  },
  subA: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  subB: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    marginRight: 15,
  },
  farmer: {
    position: 'relative',
    left:215,
    top: '2%',
    marginBottom: '10%',
    transform: [{scaleY: 1/7}, {scaleX: 1/7}],
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
  favoritesBox: {
    width: "85%",
    height: "80%",
    backgroundColor: "#ffffe0",
    marginLeft: "7%",
    borderRadius: 20
  }

})
export default Favorites