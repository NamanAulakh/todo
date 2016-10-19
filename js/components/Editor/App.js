
import React, {Component} from 'react';
import {connect} from 'react-redux';


import GenerateImage from './generateImage';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {moveCard, makeActive, showAll, toggle} from './actions/card';

import ScrollMe from '../scrollMe';
import ToolBar from './toolbar';
import CustomAnimation from '../customAnimation';
import Gesture from './gesture';

import {takeSnapshot} from 'react-native-view-shot';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const imageHeight = 1024 / PixelRatio.get();
const imageWidth = 1024 / PixelRatio.get();

class App extends Component {

  static propTypes = {
    moveCard: React.PropTypes.func.isRequired,
    makeActive: React.PropTypes.func.isRequired,
    showAll: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    allMadeActive: React.PropTypes.any,
    arrowUp: React.PropTypes.any,
    data: React.PropTypes.any,
    screenshot: React.PropTypes.any,
    isAnimated: React.PropTypes.any
  }

  componentWillMount() {
    var self = this;
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

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps : componentWillReceiveProps(App.js:Editor): ' , nextProps);
    // this.props.onChange(nextProps);
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
        <View style={{flex: 9, paddingHorizontal: 10, overflow: 'hidden'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>Collage / Dressed like a princess</Text>
            </View>
            <View style={{flex: 9, backgroundColor: 'white', marginBottom: 10, overflow: 'hidden'}}>
              <View style={{flex: 10,}}>
                <Gesture/>
              </View>
              <View style={{flex: 1}}>
                <ToolBar
                _viewRef = {this._viewRef}
                />
              </View>
            </View>
        </View>
        <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
          <CustomAnimation/>
        </View>
        <View style={{flex:1,opacity:0}} pointerEvents="none">
          <View style={{height:imageHeight, width:imageWidth, backgroundColor: 'transparent'}} ref={(child) => {
            this._viewRef = child;
            }}>
            {this.props.screenshot ?
            <GenerateImage data = {this.props.card}
            imageHeight = {imageHeight}
            imageWidh = {imageWidth}
            heightToWidhRatio = {(deviceHeight-115)/deviceWidth}
            />
            :
            <View/>}
          </View>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    moveCard: (obj, i) => dispatch(moveCard(obj, i)),
    makeActive: i => dispatch(makeActive(i)),
    showAll: () => dispatch(showAll()),
    toggle: ()=>dispatch(toggle())
  };
}

function mapStateToProps(state) {
  return {
    card: state.card.card,
    arrowUp: state.card.arrowUp,
    screenshot: state.card.screenshot,
    isAnimated: state.card.isAnimated
  };
}


export default connect(mapStateToProps, bindAction)(App);
