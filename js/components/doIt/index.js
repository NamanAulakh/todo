
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TouchableOpacity, View, ScrollView, Image,  Dimensions} from 'react-native';

// import {toggle} from '../Editor/actions/card';

import {Container, Header, Title, Content, Text, Button, Icon} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './style';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class DoIt extends Component {

    render() {
        return (
            <View style={{flex:1}}>
              <Text>Collective</Text>
            </View>
        );
    }
}


export default connect()(DoIt);
