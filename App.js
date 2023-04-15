import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import Market from './screens/Market';
import Profile from './screens/Profile';
import CreatePost from './screens/CreatePost';
import Messages from './screens/Messages';
import CreateAccount from './screens/CreateAccount';
import Open from './screens/Open';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Open"
          component={Open}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccount} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen
         name="Profile"
         component={Profile}
        />
        <Stack.Screen
            name="Market"
            component={Market}
        />
        <Stack.Screen
            name="Messages"
            component={Messages}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
