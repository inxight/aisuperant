import React, {Component, useState, useEffect, useRef} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Accordion } from "native-base";
//import Head_menu from './src/Components/head_menu';
import { WebView } from 'react-native-webview';
import Headmenu from '../Components/head_menu';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//import Spinner from 'react-native-spinner';
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

let { height, width } = Dimensions.get('window');

function Holding_item (props) {
  const [grade, setGrade] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('http://61.97.191.122/superant/holding_info.jsp');

  AsyncStorage.getItem('userData', (err, result) => {
    const UserInfo = JSON.parse(result);
    //const UserInfo.premium);
    setGrade(UserInfo.premium);
    setId(UserInfo.id);
  });
  
    //render() {
        const scrollRef = useRef();
        //const state = this.state;
        const [scroll, setScroll] = useState(0);
        const [loading, setLoading] = useState(false);
        const [showView, setShowView] = useState(false);
 
        useEffect(()=>{
          setTimeout(() => { setLoading(true) }, 1000)
        },[props])
        
        let webviewRef = useRef();

        /** 웹뷰 ref */
        const handleSetRef = _ref => {
          webviewRef = _ref;
        }; 
               
        
        return (
        <Container style={{flex: 1, backgroundColor:"#000000", position:'relative'}}>
            <Headmenu navigation={props.navigation} menu='1' />
            
            <View style={styles.container}>
              {
                !loading ? 
                <UIActivityIndicator color='white' />
                :
                <WebView 
                source={{uri: url+"?id="+id}}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                useWebKit={true} />
              }

              {
                loading == true && grade == false ? 
                  !showView ?
                <View style={{position:'absolute', top:'35%', left:0, width:'85%',marginRight:30,marginLeft:30, }}> 
                  <TouchableOpacity onPress={() => setShowView(true)} 
                    style={{ backgroundColor:'#fff', alignSelf:'flex-end', alignItems:'center',justifyContent:'center', width:70, height:25, borderColor:'#000', borderWidth:1, borderRadius:7, marginTop:-10, marginBottom:10 }}
                    >
                    <Text>닫기</Text>
                  </TouchableOpacity>                  
                  <TouchableOpacity onPress={() => props.navigation.navigate('Premium_reg', {lang_to: ''})} style={{ 
                    borderWidth:1, borderRadius:15, padding:20, flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff'}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                      <Image source={require('../images/s_logo.png')}/>
                      <Text style={{fontSize:18,fontWeight:'bold', paddingLeft:15, paddingTop:20}}><Text style={{color:'#FA2A36'}}>프리미엄 계정</Text>으로{"\n"}업그레이드 하시면{"\n"}모든 보유 종목을{"\n"}확인할수 있습니다.</Text>
                    </View>
                  </TouchableOpacity>

                </View>
                  : null
                : null
              }

            </View>
        </Container>
        );
    //}
}
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 15, backgroundColor: '#000', flexDirection: 'row', width:'100%' },
    header: { height: 50, backgroundColor: '#999999' },
    headertext: { textAlign: 'center', fontWeight: '100', color:'#ffffff' },
    text: { textAlign: 'center', fontWeight: '100', color:'#000000' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#ffffff' }, 
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
      //margin:8, 
      // margin:5,
      paddingLeft:13,
      paddingRight:13,
      //padding:10,
      backgroundColor:'#ffffff',
      borderRadius:15,
      borderWidth:2,
      borderColor:'#605E5F',
    },
    btnMenuText: {
      fontWeight:'bold',
      fontSize:15
    },
    btnMenu_on: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center', 
      //margin:8, 
      // margin:5,
      paddingLeft:13,
      paddingRight:13,
      //padding:10,
      backgroundColor:'red',
      borderRadius:15,
      borderWidth:2,
      borderColor:'#605E5F',
    },
    btnMenuText_on: {
      fontWeight:'bold',
      fontSize:15,
      color:'#ffffff'
    },
    btnViewHeight: {
      height:40
    }
  });
  
  export default Holding_item;