import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,Text,ScrollView,Dimensions,Image} from 'react-native';
import {Button} from 'native-base';
import {GridView} from 'react-native-cascadeGrid'
var {height, width} = Dimensions.get('window');
import {takeScreenshot} from './actions/card';
const images = [
  {
    url: 'http://babylon.geekydev.com/images/170991132.png',
    height: 400,
    width: 188
  },
  {
    url: 'http://babylon.geekydev.com/images/182718890.png',
    height: 400,
    width: 302
  },
  {
    url: 'http://babylon.geekydev.com/images/183887580.png',
    height: 400,
    width: 388
  },
  {
    url: 'http://babylon.geekydev.com/images/181547901.png',
    height: 400,
    width: 247
  },
  {
    url: 'http://babylon.geekydev.com/images/183270113.png',
    height: 400,
    width: 377
  },
  {
    url: 'http://babylon.geekydev.com/images/184019230.png',
    height: 400,
    width: 336
  },
  {
    url: 'http://babylon.geekydev.com/images/175808492.png',
    height: 172,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/182010866.png',
    height: 340,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/183304240.png',
    height: 400,
    width: 378
  },
  {
    url: 'http://babylon.geekydev.com/images/177082432.png',
    height: 400,
    width: 149
  },
  {
    url: 'http://babylon.geekydev.com/images/183369275.png',
    height: 400,
    width: 124
  },
  {
    url: 'http://babylon.geekydev.com/images/181180070.png',
    height: 340,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/195679393.png',
    height: 400,
    width: 350
  }
];
export default class App extends Component {
  render() {
    return(
      <GridView images = {images} columns = {3} horizontalFix = {true}  />
    )
  }
}
