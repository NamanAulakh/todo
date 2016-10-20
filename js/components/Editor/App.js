
import React, {Component} from 'react';
import {connect} from 'react-redux';

import GenerateImage from './generateImage';

import {Dimensions,View,Text,PixelRatio} from 'react-native';

import ToolBar from './toolbar';
import CustomAnimation from '../customAnimation';
import Gesture from './gesture';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const imageHeight = 1024 / PixelRatio.get();
const imageWidth = 1024 / PixelRatio.get();

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
            <View style={{flex: 10, backgroundColor: 'white',overflow: 'hidden'}}>
              <View style={{flex: 10}}>
                <Gesture/>
              </View>
              <View style={{flex: 1}}>
                <ToolBar
                _viewRef = {this._viewRef}
                />
              </View>
            </View>
        </View>
        <View style={{flex: 2,opacity: 1,backgroundColor:'red'}} pointerEvents="none">
          <View style={{height: imageHeight, width: imageWidth, backgroundColor: 'transparent'}} ref={(child) => {
            this._viewRef = child;
            }}>
            {this.props.screenshot ?
            <GenerateImage data = {this.props.card}
            imageHeight = {imageHeight}
            imageWidh = {imageWidth}
            heightToWidhRatio = {(deviceHeight - 115) / deviceWidth}
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
