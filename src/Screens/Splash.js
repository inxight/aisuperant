import React, {Component, useState, useEffect} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, BackHandler, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section } from 'react-native';
import { Container, Content, Accordion } from "native-base";
import { NavigationContainer, useNavigation, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import Head_menu from './src/Components/head_menu';
import { WebView } from 'react-native-webview';
//import firebase from '@react-native-firebase/app';
//import iid from '@react-native-firebase/iid';
import messaging from '@react-native-firebase/messaging';
import Axios from 'axios';
//import NetInfo from "@react-native-community/netinfo";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import Loginpage from '../Screens/Loginpage';
import { UIActivityIndicator } from 'react-native-indicators';
import Swiper from 'react-native-swiper'
import asyncStorage from '../Components/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
let { height, width } = Dimensions.get('window');

class Splash extends Component { 
  
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      userInfo: [],
      spin_chk: false,
      data: null,
      login_type: null,
      fcmToken_data: null,
    };
    this.requestPermission();

    //AsyncStorage.removeItem('userData');

    AsyncStorage.getItem('userData', (err, result) => {
      const UserInfo = JSON.parse(result);
      if (UserInfo != null && UserInfo.id){
        this.setState({ loggedIn: true, userInfo: UserInfo });
      }
    });
    
 
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (error) {
      alert('permission rejected');
    }
  }

  async getToken() {
    try{
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        this.setState({ fcmToken_data: fcmToken });
        console.log(fcmToken);
        //Alert.alert('fcmToken', JSON.stringify(fcmToken), [{ text: 'copy', onPress: () => Clipboard.setString(JSON.stringify(fcmToken)) }]);
      }
    }catch(error) {
      //alert('permission rejected1');
      console.log(error);
    }
  }
    
  componentDidMount =  async() => {
    GoogleSignin.configure({
      webClientId: '891695101991-k78cmmnmc11n7brl1seisbmnp244k6di.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });

    setTimeout(() => { this.loginchk(this.props) }, 2000);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

   // ????????? ??????
  componentWillUnmount() {
      this.exitApp = false;
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

   // ????????? ??????
  handleBackButton = () => {
      // 2000(2???) ?????? back ????????? ?????? ??? ?????? ??? ?????? ??? ??????
      if (this.exitApp == undefined || !this.exitApp) {
          ToastAndroid.show('?????? ??? ???????????? ???????????????.', ToastAndroid.SHORT);
          this.exitApp = true;

          this.timeout = setTimeout(
              () => {
                  this.exitApp = false;
              },
              2000    // 2???
          );
      } else {
          clearTimeout(this.timeout);

          BackHandler.exitApp();  // ??? ??????
      }
      return true;
  }

  _signIn = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
      var logintype = 0;
   
      const response = await Axios.post("http://61.97.191.122/superant/superant_member.jsp", null, { params: {
          mode: '2',
          id: userInfo.user.id,
          name: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
          familyname: userInfo.user.familyName,
          givenname: userInfo.user.givenName,
          fcmtoken: this.state.fcmToken_data
      }},{
      headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function (response) {
          // response  
          console.log(response.data);

          if(response.data.result_code == '1'){   //????????????
              const userInfoData = {
                id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                familyName: userInfo.user.familyName,
                givenName: userInfo.user.givenName,
                premium: false,
                loggedIn: true
              };
              AsyncStorage.setItem('userData',JSON.stringify(userInfoData), () => {
                //console.log('???????????? ?????? ??????')
              });
              logintype = 1;
              //this.setState({ login_type: '1' });
          }else if(response.data.result_code == '2'){  //????????????
              const userInfoData = {
                id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                familyName: userInfo.user.familyName,
                givenName: userInfo.user.givenName,
                premium: response.data.premium,
                loggedIn: true
              };
              AsyncStorage.setItem('userData',JSON.stringify(userInfoData), () => {
                //console.log('???????????? ?????? ??????')
              });
              logintype = 2;
              //this.setState({ login_type: '2' });
          }else{  //??????
            ToastAndroid.showWithGravity('[999]???????????? ????????? ?????????????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            //this.props.navigation.replace('Mainpage');
          }
           
      }).catch(function (error) {
          // ??????????????? ??????
          console.log(error);
      }).then(function() {
          // ?????? ??????
      });
      
      this.setState({ login_type: logintype });
       
      if(this.state.login_type == '1'){
        ToastAndroid.showWithGravity('??????????????? ?????????????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        this.props.navigation.replace('Mainpage');
      }else if( this.state.login_type == '2' ){
        ToastAndroid.showWithGravity('????????? ???????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        this.props.navigation.replace('Mainpage');
      }
      
      

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
  
  loginchk = async (props) => {
   
    //try {
      if(!this.state.loggedIn){
        this.setState({ spin_chk: true });
      }else{
         var logintype = 0;
         var userid = this.state.userInfo.id;
         var username = this.state.userInfo.name;
         var useremail = this.state.userInfo.email;
         var userphoto = this.state.userInfo.photo;
         var userfamilyName = this.state.userInfo.familyName;
         var usergivenName = this.state.userInfo.givenName;
        try{
          console.log("--->"+this.state.fcmToken_data);
          const response = await Axios.post("http://61.97.191.122/superant/superant_member.jsp", null, { params: {
              mode: '1',
              id: this.state.userInfo.id,
              name: this.state.userInfo.name,
              email: this.state.userInfo.email,
              fcmtoken: this.state.fcmToken_data
          }},{
          headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded' }
          }).then(function (response) {
              console.log(response.data);
              // response  
              if(response.data.result_code == '1'){   //OK ???????????????
              
                  const userInfoData = {
                    id: userid,
                    name: username,
                    email: useremail,
                    photo: userphoto,
                    familyName: userfamilyName,
                    givenName: usergivenName,
                    premium: (response.data.premium=="")?false:response.data.premium,
                    loggedIn: true
                  };
                  AsyncStorage.setItem('userData',JSON.stringify(userInfoData), () => {
                    //console.log('???????????? ?????? ??????')
                  });
                  logintype = 1;
                  //this.setState({ login_type: '1' });
              }else if(response.data.result_code == '2'){  //?????? ??????
                logintype = 0;
                ToastAndroid.showWithGravity('[2]????????? ????????? ????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
              }else{  //??????
                logintype = 0;
                ToastAndroid.showWithGravity('[999]???????????? ????????? ?????????????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                //this.props.navigation.replace('Mainpage');
              }
              //this.setState({ login_type: logintype });
       
              if(logintype == '1'){
                ToastAndroid.showWithGravity('????????? ???????????????.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                props.navigation.replace('Mainpage');
              }

          }).catch(function (error) {
              // ??????????????? ??????
              console.log(error);
          }).then(function() {
              // ?????? ??????
          });
        } catch (error) {
          console.error(error);
        }  
      }
    //} catch (error) {
    //  console.error(error);
    //}  
  };

   
  render(){
                   
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:"#FFFFFF"}}>
      <View style={{flex:2}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:100 }}>
            <Image source={require('../images/app_name_main.png')} />
          </View>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingTop:50 }}>
            <Image source={require('../images/logo.png')} />
          </View>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          {!this.state.spin_chk ? 
          <UIActivityIndicator color='black' />
           : 
          <GoogleSigninButton
            style={{ width: 230, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} />
          }
        </View>
        <View style={styles.borderBox}>
          <Swiper style={styles.wrapper} showsButtons={false} autoplay={false} showsPagination={false} containerStyle={{justifyContent:'center', alignItems:'center'}}>
            <View style={styles.slide1}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>?????? ??? ??? ????????? ????????? ????????????</Text>
            </View>
            <View style={styles.slide1}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>??????????????? ???????????? ?????????</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>???????????? ??????????????? ????????? ????????? ?????? ?????????</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>??????. ??? ?????? ????????? ??? ?????? ???????????? ???????????????</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>??????????????? ?????????????????? ?????? ??? ????????????</Text>
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

export default Splash;