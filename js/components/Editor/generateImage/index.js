'use strict';

import React, {Component} from 'react';
import {Animated, View,WebView,Image,Dimensions,Text,PixelRatio,Alert} from 'react-native';
import {connect} from 'react-redux';
class GenerateImage extends Component {
  render() {
    var images = this.props.data,
        {height, width} = Dimensions.get('window'),
        pixelRatio = PixelRatio.get(),
        ratio = this.props.heightToWidhRatio,
        requiredHeight = this.props.imageHeight,
        requiredWidth = requiredHeight/ratio,
        originalHeight = ratio*width,
        originalWidth = width;
      if(images.length) {
      var horizontalScale = requiredWidth/originalWidth;
      var verticalScale = requiredHeight/originalHeight;
      return (
        <View style = {{height: this.props.imageHeight, width: this.props.imageWidth}}>
          <View style={{width:requiredWidth,height:requiredHeight,alignSelf:'center'}}>
            {
              images.map(function(item,i) {
                return(
                    <Image
                    key={i}
                    style={{
                      position:'absolute',
                      top:(item.top)*verticalScale,
                      left:(item.left)*horizontalScale,
                      width:item.width*horizontalScale,
                      height:item.height*verticalScale,
                      transform: [{rotate: `${item.rotateAngle}deg`},{scaleX: item.scaleX}, {scaleY: item.scaleY}]}}
                    source = {{uri : item.url}}/>
                  );
              })
            }
          </View>
        </View>
      );
    }
    else {
      return <View/>;
    }
  }
}


export default GenerateImage;
