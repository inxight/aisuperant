import React, {Component, useState, useEffect, useRef} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, TextInput, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Accordion } from "native-base";
//import Head_menu from './src/Components/head_menu';
import Headmenu from '../Components/head_menu';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { WebView } from 'react-native-webview';
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

let { height, width } = Dimensions.get('window');

function Sales_history (props) {
    const [grade, setGrade] = useState('');
    const [id, setId] = useState('');
    const [url, setUrl] = useState('http://61.97.191.122/superant/trading_info.jsp');
    

      AsyncStorage.getItem('userData', (err, result) => {
        const UserInfo = JSON.parse(result);
        //const UserInfo.premium);
        setGrade(UserInfo.premium);
        setId(UserInfo.id);
      });
        const scrollRef = useRef();
        //const state = this.state;
        const [loading, setLoading] = useState(false);
        const [text, setText] = useState('');      
        const [text1, setText1] = useState('');
        

        useEffect(()=>{
          setTimeout(() => { setLoading(true) }, 1000)
        },[props])         
        
        const handleOnMessage = ({ nativeEvent: { data } }) => {
          //console.log(data); // { type: "REQ_CAMERA_PERMISSION" }
          const { total_rate, ave_rate } = JSON.parse(data);
          //console.log(total_rate+"/"+ave_rate);
          setText(total_rate);
          setText1(ave_rate);
        };

        return (
        <Container style={{flex: 1, backgroundColor:"#000000", position:'relative'}}>
            <Headmenu navigation={props.navigation} menu='4' />
            <View style={{backgroundColor:'#363636', alignItems:'center', justifyContent:'center', paddingTop:4, paddingBottom:4, marginTop:12}}>
                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', width:'50%'}}>
                      <Text style={{color:'#fff', fontWeight:'700'}}>총수익률  </Text>
                      <TextInput
                        style={{height:38, borderRadius:10, backgroundColor:'#fff', width:90, color:'#000', textAlign:'center'}}
                        value={text}
                        editable={false}
                      />
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', width:'50%'}}>
                      <Text style={{color:'#fff', fontWeight:'700'}}>평균 수익률   </Text>
                      <TextInput
                        style={{height:38, borderRadius:10, backgroundColor:'#fff', width:90, color:'#000', textAlign:'center'}}
                        value={text1}
                        editable={false}
                      />
                  </View>
                </View>
            </View>
            <View style={styles.container}>
              {
                !loading ? 
                <UIActivityIndicator color='white' />
                :
                <WebView source={{uri: url+"?id="+id}}
                onMessage={handleOnMessage} />
              }

            </View>
        </Container>
        );
}
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 15, backgroundColor: '#000', flexDirection: 'row' },
    header: { height: 50, backgroundColor: '#999999' },
    headertext: { textAlign: 'center', fontWeight: '100', color:'#ffffff' },
    text: { textAlign: 'center', fontWeight: '100' },
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
      fontSize:17
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
      fontSize:17,
      color:'#ffffff'
    },
    btnViewHeight: {
      height:55
    }
  });
  
  export default Sales_history;