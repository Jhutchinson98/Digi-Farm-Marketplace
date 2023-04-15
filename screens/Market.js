import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard'
import MarketItem from '../components/MarketItem';

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
                        <Text>Home</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subB}>
                <TouchableOpacity onPress={messages}>
                    <View style={styles.homeButton}>
                        <Text>Message</Text>
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
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FCC88E"
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
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
        marginVertical: '2%'
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