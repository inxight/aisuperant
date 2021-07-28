import React, {Component, useState, useEffect, useRef} from 'react';
import { View, ImageBackground, Text, Dimensions, ToastAndroid, Linking, Image, Button, Switch, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Section, TouchableOpacity, TouchableHighlight } from 'react-native';


let menu1 = false;
let menu2 = false;
let menu3 = false;
let menu4 = false;

const head_Menu = ({navigation, menu}) => {
  
    useEffect( () => {
    }, [])

    menu1 = false;
    menu2 = false;
    menu3 = false;
    menu4 = false;

    if(menu == '1'){
        menu1 = true;
    }else if(menu == '2'){
        menu2 = true;
    }else if(menu == '3'){
        menu3 = true;
    }else if(menu == '4'){
        menu4 = true;
    }
    
    return (
        <> 
            <View style={{justifyContent:'center', alignItems:'center', height:80 }}>
                <Image source={require('../images/app_name.png')} />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:'#363636', paddingTop:7, paddingBottom:7}}>
                <View style={styles.btnViewHeight}>
                  { menu1?
                  <TouchableOpacity style={styles.btnMenu_on} onPress={() => navigation.navigate('Holding_item', {lang_to: ''})}><Text style={styles.btnMenuText_on}>보유종목</Text></TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Holding_item', {lang_to: ''})}><Text style={styles.btnMenuText}>보유종목</Text></TouchableOpacity>
                  }
                </View>
                <View style={styles.btnViewHeight}>
                  { menu2?
                  <TouchableOpacity style={styles.btnMenu_on} onPress={() => navigation.navigate('Buy_item', {lang_to: ''})}><Text style={styles.btnMenuText_on}>매수종목</Text></TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Buy_item', {lang_to: ''})}><Text style={styles.btnMenuText}>매수종목</Text></TouchableOpacity>
                  }
                </View>
                <View style={styles.btnViewHeight}>
                { menu3?  
                  <TouchableOpacity style={styles.btnMenu_on} onPress={() => navigation.navigate('Sell_item', {lang_to: ''})}><Text style={styles.btnMenuText_on}>매도종목</Text></TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Sell_item', {lang_to: ''})}><Text style={styles.btnMenuText}>매도종목</Text></TouchableOpacity>
                }
                </View>
                <View style={styles.btnViewHeight}>
                { menu4? 
                  <TouchableOpacity style={styles.btnMenu_on} onPress={() => navigation.navigate('Sales_history', {lang_to: ''})}><Text style={styles.btnMenuText_on}>매매내역</Text></TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('Sales_history', {lang_to: ''})}><Text style={styles.btnMenuText}>매매내역</Text></TouchableOpacity>
                }
                </View>
            </View>
        </>
    );
};

head_Menu.defaultProps = {
    menu : '1'
}

const styles = StyleSheet.create({
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
    btnMenu_on: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      paddingLeft:13,
      paddingRight:13,
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



  export default head_Menu;