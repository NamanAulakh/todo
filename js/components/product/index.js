import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View, Text, Image,  Dimensions} from 'react-native';
import {Container, Header, Title, Button, Icon} from 'native-base';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import light from '../../themes/light';

class Product extends Component {
  render()  {
    console.log('...index.js:(Product)');
    return(
      <View style={{flex:1,}}>
        <Header style={{backgroundColor:'white'}}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
            <View>
              <Button transparent>
                  <Icon name="ios-arrow-back" style={{color:'black'}}/>
              </Button>
            </View>

            <Title style={{color:'rgba(25,25,25,1)'}}>Product name</Title>

            <View>

            </View>
          </View>
        </Header>

        <View style={{flex:1,marginHorizontal:10}}>
          <View style={{flex:7,backgroundColor:'green'}}>
            <Image
            source={require('../../../images/logo.png')}
            style={{flex:1,width:deviceWidth-20,height:deviceHeight/2}}
            >
            </Image>
          </View>
          <View style={{flex:3,}}>
            <View style={{flex:1,marginTop:20}}>
              <View style={{flex:1,}}>
                <Text style={{fontSize:15,fontWeight:'700',color:'rgba(25,25,25,1)'}}>Product name</Text>
              </View>
              <View style={{flex:2,}}>
                <View style={{flex:1,}}>
                  <Text style={{fontSize:15,fontWeight:'700',color:'rgba(25,25,25,1)'}}>"Merk"</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                    <Text style={{fontSize:15,fontWeight:'700',color:'rgba(25,25,25,1)'}}># # #</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:15,fontWeight:'700',color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                    <Text style={{fontSize:15,fontWeight:'700',color:'rgba(144,144,144,1)'}}> / </Text>
                    <Text style={{fontSize:15,fontWeight:'700',color:'rgba(0,182,212,1)'}}>vC 3106</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex:1,}}>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

export default Product;
