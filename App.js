/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useState, useEffect} from 'react';
 //import type {Node} from 'react';
 import { View, ImageBackground, Text, Dimensions, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section } from 'react-native';
 import { Container, Content, Accordion } from "native-base";
 import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
 import { createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
 //import Head_menu from './src/Components/head_menu';
 import { WebView } from 'react-native-webview';
 //import firebase from '@react-native-firebase/app';
 //import iid from '@react-native-firebase/iid';
 import messaging from '@react-native-firebase/messaging';
 import Axios from 'axios';
 //import NetInfo from "@react-native-community/netinfo";
 //import SplashScreen from './src/Screen/Splash';
 import Splash from './src/Screens/Splash';
 import Loginpage from './src/Screens/Loginpage';
 import Mainpage from './src/Screens/Mainpage';
 import Premium_reg from './src/Screens/Premium_reg';
 import Holding_item from './src/Screens/Holding_item';
 import Buy_item from './src/Screens/Buy_item';
 import Sell_item from './src/Screens/Sell_item';
 import Sales_history from './src/Screens/Sales_history';
 
 const Stack = createStackNavigator();
 
 const forFade = ({ current }) => ({
   cardStyle: {
     opacity: current.progress,
   },
 });
 

 function App(props) {
   let { height, width } = Dimensions.get('window');
   
   useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      return unsubscribe;
    }, []);


   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}} >
           <Stack.Screen name="Splash" options={{ title: '', headerTransparent:true, headerStyleInterpolator: HeaderStyleInterpolators.forUIKit}} component={Splash} />
           <Stack.Screen name="Loginpage" options={{ title: '', headerStyleInterpolator: HeaderStyleInterpolators.forUIKit }} component={Loginpage}  />
           <Stack.Screen name="Mainpage" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Mainpage}  />
           <Stack.Screen name="Premium_reg" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Premium_reg}  />
           <Stack.Screen name="Holding_item" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Holding_item}  />
           <Stack.Screen name="Buy_item" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Buy_item}  />
           <Stack.Screen name="Sell_item" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Sell_item}  />
           <Stack.Screen name="Sales_history" options={{ title: '', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={Sales_history}  />
       </Stack.Navigator>
     </NavigationContainer>
   );
   
 }
 
 const styles = StyleSheet.create({
   borderBox: {
     flex: 1, 
     justifyContent:'center', 
     alignItems:'center', 
     borderStyle:'solid', 
     borderRadius:20, 
     borderColor:'black', 
     borderWidth:7, 
     width:'90%', 
     height:100,
     margin:20,
     marginBottom:30
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 