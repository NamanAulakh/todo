import React, {Component} from 'react';
import {connect} from 'react-redux';

import GenerateImage from './generateImage';
import {View,Text,PixelRatio} from 'react-native';

import ToolBar from './toolbar';
import Gesture from './gesture';

const imageHeight = 1024 / PixelRatio.get();
const imageWidth = 1024 / PixelRatio.get();

const screenshotWidth = 0;
const screenshotHeight = 0;

class App extends Component {

  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    data: React.PropTypes.any,
    screenshot: React.PropTypes.any
  }

  componentWillMount() {
//................................................................................................................
      // console.log('componentWillMount:App.js...');
      //
      // if (this.props.data.length !== 0) {
      //   console.log('Populating interior store with following data from outside: ' , this.props.data.length);
      //   this.props.addData(this.props.data);
      // }
      // else {
      //   console.log('No data from outside');
      // }
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
        <View style={{flex: 9, paddingHorizontal: 10, overflow: 'hidden'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>Collage / Dressed like a princess</Text>
            </View>
              <View style={{flex: 9, backgroundColor: 'white', marginBottom: 10, overflow: 'hidden'}}>
                <View style={{flex: 10}}
                  onLayout = {(event) => {
                    var width = event.nativeEvent.layout.width,
                        height = event.nativeEvent.layout.height;
                        screenshotWidth = width;
                        screenshotHeight = height;
                  }}>
                  <Gesture/>
                </View>
                <View style={{flex: 1}}>
                  <ToolBar
                  _viewRef = {this._viewRef}
                  />
                </View>
              </View>
          </View>
          <View style={{flex: 0.2,opacity: 0}} pointerEvents="none">
            <View style={{height: imageHeight, width: imageWidth, backgroundColor: 'transparent'}} ref={(child) => {
              this._viewRef = child;
              }}>
              {this.props.screenshot ?
              <GenerateImage data = {this.props.card}
              imageHeight = {imageHeight}
              imageWidh = {imageWidth}
              heightToWidhRatio = {screenshotHeight / screenshotWidth}
              />
              :
              <View/>}
            </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    card: state.card.card,
    screenshot: state.card.screenshot
  };
}


export default connect(mapStateToProps)(App);
