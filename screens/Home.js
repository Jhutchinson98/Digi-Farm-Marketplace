import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

function HomeScreen({navigation,route}) {

  const ProfileCard = () => {
    navigation.navigate('Profile')
  }

  const Market = () => {
    navigation.navigate('Market')
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.subA}>
            <Text>Hi, Danny</Text>
            <Text>Springfield, MO</Text>
          </View>
          <View style={styles.subB}>
            <TouchableOpacity onPress={ProfileCard}>
              <View style={styles.profileButton}>
                <Text>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.search}>
          <TextInput placeholder='Search for a Marketplace'/>
        </View>
        <View style={styles.scrollBar}>
          <Text>ScrollBar</Text>
        </View>
        <View style={styles.local}>
          <View style={styles.subLocal}>
          <View style={styles.subA}>
            <Text>Local Markets</Text>
          </View>
          <View style={styles.subB}>
            <TouchableOpacity>
              <Text>See All *arrow*</Text>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.localScroll}>
            <TouchableOpacity onPress={Market}>
              <Text>Profile Card</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nav}>
          <View>
            <TouchableOpacity>
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text>Location</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>  
              <Text>Bookmarks</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#abcabc',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    width: '85%',
    marginVertical: '2%'
  },
  subA: {
    justifyContent: 'flex-start',
    height: '100%',
    width: '50%'
  },
  subB: {
    alignItems: 'flex-end',
    height: '100%',
    width: '50%'
  },
  search: {
    backgroundColor: '#345f25',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '85%',
    marginVertical: '2%'
  },
  scrollBar: {
    backgroundColor: '#af5621',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '85%',
    marginVertical: '2%'
  },
  local: {
    backgroundColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
    width: '85%',
    marginVertical: '2%'
  },
  subLocal: {
    display: 'flex',
    flexDirection: 'row'
  },
  localScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '100%'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#42d0a1',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
    width: '85%',
    marginVertical: '2%'
  },
  profileButton: {
    borderRadius: 100,
    //font: 
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80%",
    marginLeft: "10%",
    backgroundColor: "#FCC88E"
  }
})

export default HomeScreen