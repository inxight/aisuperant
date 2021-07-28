import React, {Component, useState, useEffect, useRef} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Accordion } from "native-base";
//import Head_menu from './src/Components/head_menu';
import Headmenu from '../Components/head_menu';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { WebView } from 'react-native-webview';
import { UIActivityIndicator } from 'react-native-indicators';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

let { height, width } = Dimensions.get('window');

function Sell_item (props) {
        const [grade, setGrade] = useState('');
        const [id, setId] = useState('');
        const [url, setUrl] = useState('http://61.97.191.122/superant/selling_info.jsp');
   
      AsyncStorage.getItem('userData', (err, result) => {
        const UserInfo = JSON.parse(result);
        //const UserInfo.premium);
        setGrade(UserInfo.premium);
        setId(UserInfo.id);
      });

        const scrollRef = useRef();
        //const state = this.state;
                
        const [loading, setLoading] = useState(false);
        const [check, setCheck] = useState("0");

        useEffect(()=>{
          setTimeout(() => { setLoading(true) }, 1000)
        },[props])
        
        const onCheckBox = (ck) => {
          if(ck === true){
            setCheck("1");
          }else{
            setCheck("0");
          }
          setLoading(false);
          setTimeout(() => { setLoading(true) }, 1000);
        }
        
        return (
        <Container style={{flex: 1, backgroundColor:"#000000", position:'relative'}}>
            <Headmenu navigation={props.navigation} menu='3' />
            <View style={{backgroundColor:'#363636', alignItems:'flex-end', paddingTop:8, paddingBottom:8, marginTop:12}}>
                {check == "1"?
                <CircleCheckBox
                  checked={true}
                  onToggle={(checked) => onCheckBox(checked)}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label="과거매도종목(최근30일)"
                  styleLabel={{color:'#fff', fontWeight:'bold'}}
                  innerColor="#FA2A36"
                  outerColor="#ffffff"
                />
                :
                <CircleCheckBox
                  checked={false}
                  onToggle={(checked) => onCheckBox(checked)}
                  labelPosition={LABEL_POSITION.RIGHT}
                  label="과거매도종목(최근30일)"
                  styleLabel={{color:'#fff', fontWeight:'bold'}}
                  innerColor="#FA2A36"
                  outerColor="#ffffff"
                />
                }
            </View>
            <View style={{flex:0.17, justifyContent:'center', alignItems:'center'}}>
                <View style={{flex:1, flexDirection:'row', paddingTop:5}}>
                    <View style={{paddingTop:12}}>
                      <Image source={require('../images/sub_ant_logo.png')}/>
                    </View>
                    <View>
                      <Text style={{fontSize:13,fontWeight:'bold', paddingLeft:15, paddingTop:20, color:'#FA2A36'}}>AI슈퍼개미는 장 시작 시 모든 거래가 동시에 완료 됩니다.</Text>
                      <Text style={{fontSize:13,fontWeight:'bold', paddingLeft:15, paddingTop:10, paddingBottom:10, color:'#FA2A36'}}>매도종목의 매도단가는 매도일자의 시초가와 동일합니다.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
              {
                !loading ? 
                <UIActivityIndicator color='white' />
                :
                <WebView source={{uri: url+"?id="+id+"&check="+check}} />
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
  
  export default Sell_item;