import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard'
import MarketItem from '../components/MarketItem';
import { Icon } from 'react-native-elements';

function Market({navigation,route}) {

  const [products, setProducts] = useState([])

  const home = () => {
    navigation.navigate('Home')
  }

  const messages = () => {
    navigation.navigate('Messages')
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
        console.log('server error')
      }
    })
  }

  React.useEffect(() => {
    retrieveProducts(route.params.email)
  }, [])
    
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
        <ProfileCard name={route.params.name}/>
      </View>
      {/* Items being sold */}
      <View style={styles.items}>
        <ScrollView style={styles.productList}>
          {products.map((product, i) => (
            <MarketItem key ={i} product={product}/>
          ))}
          {/* <View style={styles.itemScroll}>
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
          </View> */}
        </ScrollView>
      </View>
    </View>
  )
}
    
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#B9DDA5",
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 40,
    marginBottom: '5%'
  },
  productList: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "60%",
    backgroundColor: "#EBE4F6",
    borderTopWidth: 5,
    borderTopColor: "#EBE4F6",
    borderRadius: 10,
    borderWeight:3,
    borderColor: "#FFFFF",
    height: "100%",
    padding: 8
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
    marginTop: '2%',
  },
  items: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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