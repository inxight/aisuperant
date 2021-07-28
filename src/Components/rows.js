import React, { Component } from 'react';
import { View, ViewPropTypes, Text, StyleSheet } from 'react-native';
import { Cell } from './cell';
import { sum } from '../utils';

export class Row extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, cmstyle, widthArr, height, flexArr, textStyle, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;
    let cusmStyle = [];

    return data ? (
      <>
        <View style={[height && { height }, width && { width }, styles.row, style]}>
          {data.map((item, i) => {
            const flex = flexArr && flexArr[i];
            const wth = widthArr && widthArr[i];
            
            //console.log(i+"/"+item);
            //if(i == 4){
            //  cusmStyle = style && {position:'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex:10, backgroundColor:'red'};
            //}else{
            //  cusmStyle = style;
            //}
            //console.log(cusmStyle);
            if(i < 4){
              return <Cell key={i} data={item} width={wth} height={height} flex={flex} style={style} textStyle={textStyle} {...props} />;
            }
          })}
        </View>
        <View style={[height && { height }, width && { width }, styles.cus_pos]}>
          {data.map((item, i) => {
            const flex = flexArr && flexArr[i];
            const wth = widthArr && widthArr[i];
            
            cusmStyle = style && {position:'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex:11, backgroundColor:'red'};
            if(i > 3){
              
              return <Cell key={i} data={item} width={wth} height={height} flex={flex} style={cusmStyle} textStyle={textStyle} {...props} />;
            }
          })}
        </View>
      </>
      
    ) : null;
  }
}

export class Rows extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <Row
              key={i}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  cus_pos: {
    position:'absolute',
    flexDirection: 'row',
    overflow: 'hidden'
  }
});