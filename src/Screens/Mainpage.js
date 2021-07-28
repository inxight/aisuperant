import React, {Component, useState, useEffect} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, BackHandler, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Accordion } from "native-base";
import { WebView } from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
//import iid from '@react-native-firebase/iid';
import messaging from '@react-native-firebase/messaging';
//import Axios from 'axios';
//import NetInfo from "@react-native-community/netinfo";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

let { height, width } = Dimensions.get('window');

function Mainpage(props) {
  const [grade, setGrade] = useState('');
  
    AsyncStorage.getItem('userData', (err, result) => {
      const UserInfo = JSON.parse(result);
      //const UserInfo.premium);
      setGrade(UserInfo.premium);
    });
    

    return (
      <Container style={{flex: 1, backgroundColor:"#000000", position:'relative'}}>
        <View style={{justifyContent:'center', alignItems:'center', height:120 }}>
            <Image source={require('../images/app_name.png')} />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <View style={styles.btnViewHeight}>
              <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.navigate('Holding_item', {lang_to: ''})}><Text style={styles.btnMenuText}>보유종목</Text></TouchableOpacity>
            </View>
            <View style={styles.btnViewHeight}>
              <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.navigate('Buy_item', {lang_to: ''})}><Text style={styles.btnMenuText}>매수종목</Text></TouchableOpacity>
            </View>
            <View style={styles.btnViewHeight}>
              <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.navigate('Sell_item', {lang_to: ''})}><Text style={styles.btnMenuText}>매도종목</Text></TouchableOpacity>
            </View>
            <View style={styles.btnViewHeight}>
              <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.navigate('Sales_history', {lang_to: ''})}><Text style={styles.btnMenuText}>매매내역</Text></TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor:"#ffffff", marginTop:50, width:'95%', height:300, margin:10, borderRadius:15, borderWidth:2 }}>
          <Image source={require('../images/s_logo.png')} />
          <Text style={{paddingTop:20, fontSize:15}}>아침 한 번 매매로 끝내는 주식거래 {"\n"} 슈퍼개미의 노하우를 배우다</Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          {
          !grade? (
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff', height:50, width:'50%', borderRadius:15, borderWidth:2, borderColor:'#605E5F'}}>
            <TouchableOpacity style={{width:'100%', height:50, justifyContent:'center', alignItems:'center'}} onPress={() => props.navigation.navigate('Premium_reg', {lang_to: ''})}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#EB0621'}}>프리미엄 회원</Text>
            </TouchableOpacity>
          </View>
          ) : null
          }
        </View>
      </Container>
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
    btnMenu: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center', 
      paddingLeft:13,
      paddingRight:13,
      backgroundColor:'#ffffff',
      borderRadius:15,
      borderWidth:2,
      borderColor:'#605E5F',
    },
    btnMenuText: {
      fontWeight:'bold',
      fontSize:15,
      color:'#000',
    },
    btnViewHeight: {
      height:40
    }
  });
  
  export default Mainpage;