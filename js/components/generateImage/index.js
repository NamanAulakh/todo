'use strict';

import React, {Component} from 'react';
import {Animated, View,WebView,Image,Dimensions,Text,PixelRatio,Alert} from 'react-native';
import {takeScreenshot} from '../Editor/actions/card';

import {connect} from 'react-redux';
class GenerateImage extends Component {
  static propTypes = {
    screenshot: React.PropTypes.any,
    takeScreenshot: React.PropTypes.func.isRequired
  }
  takeScreenshot() {
    this.props.takeScreenshot();
  }
  // componentDidMount() {
  //   this.takeScreenshot();
  // }
  render() {
    console.log('this is render of generate image');
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
function mapStateToProps(state) {
  return {
    screenshot: state.card.screenshot
  };
}
function bindAction(dispatch) {
  return {

    takeScreenshot: () => dispatch(takeScreenshot())
  };
}

export default connect(mapStateToProps)(GenerateImage,bindAction);
