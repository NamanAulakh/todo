
import React, {Component} from 'react';
import {connect} from 'react-redux';


import GenerateImage from '../generateImage';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {moveCard, addCard, makeActive, bringToTop, sendToBack, flipImage, showAll, duplicateImage, addData, takeScreenshot, toggle, removeImage, addText} from '../actions/card';

import light from '../../../themes/light';
import ScrollMe from '../../scrollMe';

import myTheme from '../../../themes/base-theme';
import {takeSnapshot} from 'react-native-view-shot';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const imageHeight = 1024/PixelRatio.get();
const imageWidth = 1024/PixelRatio.get();

class ToolBar extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    moveCard: React.PropTypes.func.isRequired,
    addCard: React.PropTypes.func.isRequired,
    bringToTop: React.PropTypes.func.isRequired,
    sendToBack: React.PropTypes.func.isRequired,
    flipImage: React.PropTypes.func.isRequired,
    duplicateImage: React.PropTypes.func.isRequired,
    removeImage: React.PropTypes.func.isRequired,
    makeActive: React.PropTypes.func.isRequired,
    showAll: React.PropTypes.func.isRequired,
    addData: React.PropTypes.func.isRequired,
    toggle: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    showBar: React.PropTypes.any,
    allMadeActive: React.PropTypes.any,
    arrowUp: React.PropTypes.any,
    takeScreenshot: React.PropTypes.func.isRequired,
    show: React.PropTypes.any,
    data: React.PropTypes.any,
    screenshot: React.PropTypes.any,
    currentIndex: React.PropTypes.any
  }
  //
  // componentWillMount() {
  //
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   // console.log('this.props : componentWillReceiveProps(ToolBar.js:Editor): ' , this.props);
  //   // console.log('nextProps : componentWillReceiveProps(ToolBar.js:Editor): ' , nextProps);
  // }
  //
  moveCard(obj, i) {
    this.moveCard(obj, i);
  }

  addCard() {
    this.props.addCard();
  }
  addText(str) {
    this.props.addText(str);
  }


  bringToTop(i) {
    this.props.bringToTop(i);
  }

  sendToBack(i) {
    this.props.sendToBack(i);
  }

  flipImage(i) {
    this.props.flipImage(i);
  }

  duplicateImage(i) {
    this.props.duplicateImage(i);
  }

  takeScreenshot() {
    this.props.takeScreenshot();
  }

  saveImage() {
    this.takeScreenshot();
    setTimeout(()=>{
      if(this.props.screenshot) {
        takeSnapshot(this.props._viewRef, {
          format: 'png',
          quality: 1
        })
        .then(
          uri => {
            this.takeScreenshot();
            console.log('image saved',uri);
          },
          error => alert('Oops, snapshot failed ' + error)
        );
      }
      else {
        console.log('%%%%%%%%%%%%%%%%');
      }
    },2000);
  }

  removeImage(i) {
    this.props.removeImage(i);
  }

  makeActive(i) {
    this.props.makeActive(i);
  }

  showAll() {
    this.props.showAll();
  }

  toggle()  {
    this.props.toggle();
  }

  render() {
    return (
      <View style={{flex: 1}}>

      <Button primary style={{position:'absolute',zIndex:1,left:50}} onPress={() => this.addText('hi this is kuldeeep')}>Add Text</Button>
        <View style={{flex: 1,backgroundColor: 'rgba(255,255,255,.8)'}}>
          <View style={{flexDirection: 'row',  justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.addCard()}>
                <Icon name="ios-add" />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.bringToTop(this.props.currentIndex)}>
              <Icon name="ios-arrow-up" />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.sendToBack(this.props.currentIndex)}>
              <Icon name="ios-arrow-down" />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.flipImage(this.props.currentIndex)}>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingRight: 10}}>
                  <Icon name="ios-arrow-back" />
                </View>
                <View>
                  <Icon name="ios-arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.duplicateImage(this.props.currentIndex)}>
              <Icon name="ios-copy" style={{}} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.removeImage(this.props.currentIndex)}>
              <Icon name="ios-trash" style={{}} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.saveImage()}>
              <Icon name="md-image" style={{}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    moveCard: (obj, i) => dispatch(moveCard(obj, i)),
    addCard: () => dispatch(addCard()),
    addText: (str) => dispatch(addText(str)),
    takeScreenshot: () => dispatch(takeScreenshot()),
    makeActive: i => dispatch(makeActive(i)),
    bringToTop: i => dispatch(bringToTop(i)),
    sendToBack: i => dispatch(sendToBack(i)),
    showAll: () => dispatch(showAll()),
    flipImage: i => dispatch(flipImage(i)),
    duplicateImage: i => dispatch(duplicateImage(i)),
    removeImage: i => dispatch(removeImage(i)),
    addData: (obj) => dispatch(addData(obj)),
    toggle: ()=>dispatch(toggle())
  };
}

function mapStateToProps(state) {
  return {
    list: state.list.list,
    card: state.card.card,
    arrowUp: state.card.arrowUp,
    collective: state.card.collective,
    showBar: state.card.showBar,
    allMadeActive: state.card.allMadeActive,
    show: state.card.show,
    screenshot: state.card.screenshot,
    currentIndex: state.card.currentIndex
  };
}


export default connect(mapStateToProps, bindAction)(ToolBar);
