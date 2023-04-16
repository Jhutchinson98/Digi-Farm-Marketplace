import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard'
import MarketItem from '../components/MarketItem';
import { Icon } from 'react-native-elements';

function Market({navigation,route}) {

    const home = () => {
        navigation.navigate('Home')
      }

    const messages = () => {
        navigation.navigate('Messages')
    }
    
      return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.subA}>
                  <TouchableOpacity onPress={home}>
                    <View style={styles.homeButton}>
                       <Icon name="home" />
                     </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.subB}>
                  <TouchableOpacity onPress={messages}>
                    <View style={styles.messageButton}>
                      <Icon name="message" />
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
            
            {/* User tag w/ info on user*/}
            <View style={styles.tag}>
            <ProfileCard user="Username"/>
            </View>

            {/* Items being sold */}
            <View style={styles.items}>
              <ScrollView>
                <View style={styles.itemScroll}>
                  <MarketItem style={styles.scroller}/>
                  <MarketItem/>
                </View>
                <View style={styles.itemScroll}>
                  <MarketItem style={styles.scroller}/>
                  <MarketItem/>
                </View>
                <View style={styles.itemScroll}>
                  <MarketItem style={styles.scroller}/>
                  <MarketItem/>
                </View>
                <View style={styles.itemScroll}>
                  <MarketItem style={styles.scroller}/>
                  <MarketItem style={styles.scroller}/>
                </View>
              </ScrollView>
            </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: "#B9DDA5",//"#88AC37",
            alignItems: "center",
            justifyContent: "center",
    },
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
  messageButton:{
    borderRadius: 100,
    borderColor: "#643F6E",
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    //justifyContent: "flex-start",
    //marginTop: "-15%",
    //marginLeft: "70%",
    marginRight: 15,
    marginBottom: "1%",
    backgroundColor: "#FCC88E"

  },
  header: {
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
  subA: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    width: '50%',
  },
  subB: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    width: '50%'
  },
  tag: {
    justifyContent: 'center',
    height: '15%',
    width: '85%',
    marginVertical: '2%',
  },
  items: {
    justifyContent: 'center',
    height: '60%',
    width: '85%',
    marginVertical: '5%'
   },
   scroller: {
    margin: '5%'
   },
   itemScroll: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-evenly',
    marginVertical: '2%',
    }
    })

export default Market