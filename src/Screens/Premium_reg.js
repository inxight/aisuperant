import React, {Component, useState, useEffect} from 'react';
//import type {Node} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, Accordion } from "native-base";
//import Head_menu from './src/Components/head_menu';
import { WebView } from 'react-native-webview';
//import firebase from '@react-native-firebase/app';
//import iid from '@react-native-firebase/iid';
//import messaging from '@react-native-firebase/messaging';
//import Axios from 'axios';
//import NetInfo from "@react-native-community/netinfo";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

let { height, width } = Dimensions.get('window');

function Premium_reg(props) {
    
    return (
      <Container style={{flex: 1}}>
        <ScrollView>
          <View style={{flex:1.5, paddingBottom:30}}>
              <View style={{justifyContent:'center', alignItems:'center', height:90, backgroundColor:"#ffffff" }}>
                <Text style={{fontSize:30, color:'#000000'}}>프리미엄 계정 가입</Text>
              </View>
              <View style={{backgroundColor:'#1E252D', height:100, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#ffffff', justifyContent:'center', alignItems:'center', fontWeight:'800', fontSize:18, textAlign:'center'}}>월 11만원으로 AI 슈퍼개미의 모든 기능을{"\n"}이용해 보세요.</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor:"#ffffff", marginTop:20, width:'100%', height:100 }}>
                  <View style={{justifyContent:'center', alignItems:'center', width:'90%', height:90}}>
                      <TouchableOpacity style={{width:'100%', height:80, justifyContent:'center', alignItems:'center', backgroundColor:'#F7C74D', borderRadius:15, borderWidth:1}}>
                          <Text style={{fontSize:18, fontWeight:'bold'}}>1개월 110,000원 <Text style={{fontSize:13}}>(Vat 포함)</Text></Text></TouchableOpacity>
                  </View>
              </View>
              <View style={{justifyContent:'center', alignItems:'center', paddingTop:20}}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>* 프리미엄회원 전환 혜택</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:'center', width:'100%', paddingTop:20}}>
                  <View style={{justifyContent:'center', alignItems:'center', borderColor:'#EBEBEB', borderWidth:1, width:'90%', borderRadius:5 }}>
                    <View style={{justifyContent:'center', alignItems:'flex-start', paddingTop:10, paddingBottom:10, paddingLeft:10, width:'80%' }}>
                        <Text style={{color:'#000000', fontSize:12, paddingBottom:10, textAlign:'left'}}>1. AI슈퍼개미의 보유종목 실시간 확인 가능</Text>
                        <Text style={{color:'#000000', fontSize:12, paddingBottom:10, textAlign:'left'}}>2. AI슈퍼개미의 당일 매수종목 전종목 확인 가능</Text>
                        <Text style={{color:'#000000', fontSize:12, paddingBottom:10, textAlign:'left'}}>3. AI슈퍼개미의 매매내역 실시간 확인 가능</Text>
                    </View>
                  </View>
              </View>
          </View>
          <View style={{flex:1, paddingLeft:20, paddingRight:20, paddingBottom:30, marginTop:10, backgroundColor:'#989898'}}>
              <Text style={{paddingBottom:30, color:'#ffffff', textAlign:'center', fontSize:18, paddingTop:10}}>결제안내</Text>
              <Text style={{color:'#ffffff', fontSize:12, paddingBottom:10, textAlign:'left'}}>1. 모든 결제는 구글 플레이 스토어를 통해 진행되며, 등록한 결제 수단을 이용하여 결제가 가능합니다.</Text>
              <Text style={{color:'#ffffff', fontSize:12, paddingBottom:10, textAlign:'left'}}>2. 모든 상품은 결제와 동시에 서비스 사용이 가능하므로 서비스가 개시된 결제상품에 대한 취소시 환불금액은 없습니다.</Text>
              <Text style={{color:'#ffffff', fontSize:12, paddingBottom:10, textAlign:'left'}}>3. 정기결제의 경우, 구독 기간에 대한 약정이 없으며 언제든 구글 플레이스토어를 통해 갱신에 대한 해지가 가능합니다.</Text>
              <Text style={{color:'#ffffff', fontSize:12, paddingBottom:10, textAlign:'left'}}>4. 정기결제를 해지하셔도 결제월 이용기간까지 서비스 이용이 가능하며, 결제된 상품에 대한 환불 금액은 없습니다.</Text>
              <Text style={{color:'#ffffff', fontSize:12, paddingBottom:10, textAlign:'left'}}>5. 정기결제의 갱신은 서비스 만료 24시간 안에 구글 플레이 계정을 통해 결제가 이루어집니다.</Text>
              <Text style={{color:'#ffffff', fontSize:12, textAlign:'left'}}>6. 세금이 포함되어 있습니다. (국가간 세율에 따라 결제금액의 차이가 있을수 있습니다.)</Text>
          </View>
        </ScrollView>
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
      //margin:8, 
      margin:5,
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
    btnViewHeight: {
      height:55
    }
  });
  
  export default Premium_reg;