import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ProfileCard from '../components/ProfileCard'

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
            <ProfileCard/>
            </View>

            {/* Items being sold */}
            <View style={styles.items}>

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
    homeButton: {
        borderRadius: 100,
        //font: 
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFEE00"
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
      subB: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
        width: '50%'
      },
      tag: {
        justifyContent: 'center',
        backgroundColor: '#ffffe0',
        height: '15%',
        width: '85%',
        marginVertical: '2%'
      },
      items: {
        justifyContent: 'center',
        backgroundColor: '#ffffe0',
        height: '50%',
        width: '85%',
        marginVertical: '2%'
      }
    })

export default Market