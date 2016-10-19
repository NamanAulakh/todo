import React, {Component} from 'react';
import {View,TouchableOpacity,Image} from 'react-native';
import {Text,Icon} from 'native-base';

import Icone from '../../../node_modules/react-native-vector-icons/FontAwesome.js';

class Collective extends Component {
  render() {
    return (
      <TouchableOpacity style={{flex: 1,backgroundColor: 'white',borderWidth: 2}}>
        <Image style={{resizeMode: 'cover',width: null}} source={require('../../../images/sample.png')}/>
        <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
          <Text style={{fontSize: 12}}>Product title</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
            <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
            <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
            <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
          </View>
        </View>
        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Icon name="ios-heart-outline"
              style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
            </View>
            <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
            </View>
            <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
              <Icone name="upload"
              style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default Collective;
