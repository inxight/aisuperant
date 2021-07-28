import React, {Component, useState, useEffect} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section } from 'react-native';
import { Container, Content, Accordion } from "native-base";
//import Head_menu from './src/Components/head_menu';
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
//import firebase from '@react-native-firebase/app';
//import iid from '@react-native-firebase/iid';
//import messaging from '@react-native-firebase/messaging';
//import Axios from 'axios';
//import NetInfo from "@react-native-community/netinfo";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { UIActivityIndicator } from 'react-native-indicators';
import Swiper from 'react-native-swiper'


let { height, width } = Dimensions.get('window');

class Loginpage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pushData: [],
        loggedIn: false,
        userInfo: [],
      }
    }
    
    componentDidMount() {
      GoogleSignin.configure({
        webClientId: '481333529358-idlgv15ao5rhpj8b4cilghuprptat8m9.apps.googleusercontent.com', 
        offlineAccess: true, 
        hostedDomain: '', 
        forceConsentPrompt: true, 
      });
    }

    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo: userInfo, loggedIn: true });
        ToastAndroid.showWithGravity('회원가입이 완료되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        //ToastAndroid.show('로그인 되었습니다.', ToastAndroid.SHORT);
        this.props.navigation.replace('Mainpage');
        

      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
  
    signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    };
    
    render(){
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:"#FFFFFF"}}>
            <View style={{flex:2}}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:100 }}>
                <Image source={require('../images/app_name.png')} />
              </View>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingTop:50 }}>
                <Image source={require('../images/logo.png')} />
              </View>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingTop:20 }}>
              {/*<Image source={require('../images/google_login.png')} style={{borderWidth:1, borderColor:'black', borderRadius:15}} />*/}
              {!this.state.loggedIn && 
              <GoogleSigninButton
                style={{ width: 230, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
                disabled={this.state.isSigninInProgress} />}
              {this.state.loggedIn && <View><Button onPress={this.signOut}
                  title="Signout"
                  color="#841584">
                </Button></View>}
              {this.state.loggedIn && <View>
                <Text>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
                <Text>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
                </View>}
            </View>
            <View style={styles.borderBox}>
              <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} showsPagination={false} containerStyle={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.slide1}>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>아침 한 번 매매로 끝내는 주식거래</Text>
                </View>
                <View style={styles.slide1}>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>슈퍼개미의 노하우를 배우다</Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>요동치는 주식차트에 아까운 시간을 쏟지 마세요</Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>주식. 백 마디 글보다 한 번의 실전으로 배워보세요</Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={{fontSize:18, fontWeight:'bold'}}>슈퍼개미의 포트폴리오를 가질 수 있습니다</Text>
                </View>
              </Swiper>
            </View>
          </SafeAreaView>
        );
      }
    }
  
  const styles = StyleSheet.create({
    borderBox: {
      flex: 1, 
      justifyContent:'center', 
      alignItems:'center', 
      borderStyle:'solid', 
      borderRadius:20, 
      borderColor:'black', 
      borderWidth:1.5, 
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
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      paddingLeft:30,
      paddingRight:30,
      textAlign: 'center',
      textAlignVertical:'center',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      paddingLeft:60,
      paddingRight:60,
      textAlign: 'center',
      textAlignVertical:'center',
    },
  });
  
  export default Loginpage;