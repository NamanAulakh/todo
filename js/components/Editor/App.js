
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, Dimensions, PanResponder, View, TouchableOpacity} from 'react-native';
import {Container, Icon, Text} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {moveCard, addCard, makeActive, bringToTop, sendToBack, flipImage, showAll, duplicateImage, removeImage,addData} from './actions/card';

import light from '../../themes/light';
// import {takeSnapshot} from 'react-native-view-shot';
import ScrollMe from '../scrollMe';
// import Test from '../test';

// import ParallaxScrollView from 'react-native-parallax-scroll-view';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: deviceWidth,
    height: deviceHeight
  },

  baseText: {
    fontFamily: 'Cochin'
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

let currentIndex = -1;
let startWidth = 0;
// let startRotate = 0;
let startHeight = 0;
let startY = 0;
let startX = 0;

class App extends Component {

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
    // popRoute: React.PropTypes.func.isRequired,
    showAll: React.PropTypes.func.isRequired,
    addData: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    // show: React.PropTypes.any,
    data: React.PropTypes.any,
    showBar: React.PropTypes.any,
    allMadeActive: React.PropTypes.any,
    arrowUp: React.PropTypes.any
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
              // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // console.log('kaash1');
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!

            // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
            // console.log('kaash2');
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // console.log('kaash3');
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // console.log('kaash4');
            // Another component has become the responder, so this gesture
            // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // console.log('kaash5');
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps:(App.js)...');

    console.log('nextProps : componentWillReceiveProps(App.js:Editor): ' , nextProps);
    this.props.onChange(nextProps);

    console.log('...componentWillReceiveProps:(App.js)');
  }

  // componentWillMount()  {
  //   console.log('componentWillMount:App.js...');
  //
  //   // if (this.props.data.length !== 0) {
  //   //   console.log('Populating interior store with following data from outside: ' , this.props.data.length);
  //   //   this.props.addData(this.props.data);
  //   // }
  //   // else {
  //   //   console.log('No data from outside');
  //   // }
  //   //
  //   // console.log('...componentWillMount:App.js');
  // }

  moveCard(obj, i) {
    this.props.moveCard(obj, i);
  }

  addCard() {
    this.props.addCard();
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

  saveImage() {
    console.log('Save Image Clicked');
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

  render() {
    console.log('index.js:(App.js)');
    console.log('this.props: ' , this.props);
    if (this.props.arrowUp)  {
      return (

        <Container theme={light} style={{backgroundColor: '#fff'}} >
          <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
            <View style={{flex: 2, paddingHorizontal: 10, overflow: 'hidden'}}
              ref={(child) => {
                this._viewRef = child;
              }} >
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Collage / Dressed like a princess</Text>
                </View>
                <View style={{flex: 9, backgroundColor: 'white', marginBottom: 20, overflow: 'hidden'}}>
                  <View style={{flex: 9}}>
                    <GestureView
                        style={{width: deviceWidth, height: deviceHeight, position: 'absolute', backgroundColor: 'transparent'}}
                        type="View"
                        gestures={[drag, pinch]}
                        tapCallback={() => {
                          console.log('yo');
                          currentIndex = -1;
                          this._child = null;
                          this.showAll();
                        }}
                        onRelease={(x, y, layout) => {
                          startWidth = 0;
                          // startRotate = 0;
                          startHeight = 0;
                          startY = 0;
                          startX = 0;

                          if (this._child) {
                            const coordinate = this._child.layout;
                            coordinate.rotateAngle = this.props.card[currentIndex].rotate ? this.props.card[currentIndex].rotate : 0;
                            coordinate.rotateNow = 0;
                            this.moveCard(coordinate, currentIndex);
                          }


                        }}
                        onMove={() => {
                        }}
                        gestureCallback={() => {
                          // console.log("here");
                        }}
                        toStyle={(layout) => {
                            // console.log(_child);
                            let childLayout = this._child ? this._child.layout : null;
                            if (childLayout) {
                              startWidth = startWidth ? startWidth : childLayout.width;
                              startHeight = startHeight ? startHeight : childLayout.height;
                              startY = startY ? startY : childLayout.y;
                              startX = startX ? startX : childLayout.x;
                              // startRotate = startRotate ? startRotate : (this._child.props.rotate ? this._child.props.rotate : 0);
                              let scale = layout.scale ? layout.scale : 1;
                              layout.height = startHeight * scale;// childLayout.height;
                              layout.width = startWidth * scale;// * scale;

                              // if (scale > 0) {
                              layout.y = layout.y + startY + (layout.height - startHeight);//  scale;// * scale;
                              layout.x = layout.x + startX + (layout.width - startWidth);// * scale;
                              // } else {
                              //   layout.y = layout.y + startY + (layout.height - startHeight) / 2;//  scale;// * scale;
                              //   layout.x = layout.x + startX + (layout.width - startWidth) / 2;// * scale;
                              // }
                              // console.log(startRotate, "startRotate");
                              layout.rotate = layout.rotate ? layout.rotate : 0;
                              // console.log(layout.rotate, "here");
                              this._child.props.toStyle(layout);
                            }
                        }}
                        onError={()=>{}}
                       />
                     <View pointerEvents="box-none" name="Draggable Container" style={styles.container} >
                      {
                        this.props.card.map((obj, i) => {
                          // console.log("obj:", obj);
                          // this.props.onChange(obj);
                          const movable = {
                            width: obj.width,
                            height: obj.height,
                            position: 'absolute',
                            left: obj.left,
                            top: obj.top,
                            transform: [{rotate: `${obj.rotate ? obj.rotate : (obj.rotateAngle ? obj.rotateAngle : 0)}deg`}, {scaleX: obj.scaleX}, {scaleY: obj.scaleY}]
                          };

                        if (this.props.allMadeActive) {
                          movable.opacity = 1;
                        } else {
                          if (obj.active === 1) {
                            currentIndex = i;
                            // movable.backgroundColor = 'rgba(76,174,76, 1)';
                            movable.borderRadius = 0;
                            movable.borderWidth = 1;
                            movable.borderColor = '#d6d7da';
                            movable.opacity = 1;
                          } else {
                            // movable.backgroundColor = 'rgba(76,174,76, 0.5)';
                            movable.opacity = 0.5;
                          }
                        }

                          return (
                            <GestureView
                              key={ obj.url + '_' + i }
                              style={movable}
                              pointerEvents="box-none"
                              gestures={[drag, pinch]}
                              tapCallback={() => {
                                this.makeActive(i);
                              }}
                              onRelease={(x, y, layout) => {
                                const coordinate = layout;
                                coordinate.rotateAngle = obj.rotate ? obj.rotate : 0;
                                coordinate.rotateNow = 0;
                                this.moveCard(coordinate, i);

                              }}
                              onMove={() => {
                                if (!this.props.allMadeActive)  {
                                  this.makeActive(i);
                                }
                              }}
                              type="Image"
                              source={{uri: obj.url}}
                              gestureCallback={() => {}}
                              ref={(child) => {
                                  if (obj.active === 1) {
                                    this._child = child;
                                  }
                                }
                              }
                              toStyle={(layout) => {
                                  const coordinate = layout;
                                  coordinate.rotateNow = layout.rotate ? layout.rotate : (obj.rotateNow ? obj.rotateNow :  0);
                                  coordinate.rotateAngle = obj.rotateAngle;
                                  coordinate.rotate = coordinate.rotateNow +
                                                      (coordinate.rotateAngle ? coordinate.rotateAngle : 0);
                                  this.moveCard(coordinate, i);
                                  return {
                                    top: obj.top,
                                    left: obj.left,
                                    width: obj.width,
                                    height: obj.height,
                                    transform: [{rotate: `${obj.rotate}deg`},{scaleX: obj.scaleX}, {scaleY: obj.scaleY}]
                                  };
                              }}
                              onError={() => {}}
                            />
                          );
                        })
                      }
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                  {
                    this.props.showBar ?
                    <View style={{flex: 1,backgroundColor: 'rgba(255,255,255,.8)'}}>
                      <View style={{flexDirection: 'row',  justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.addCard()}>
                            <Icon name="ios-add" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.bringToTop(currentIndex)}>
                          <Icon name="ios-arrow-up" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.sendToBack(currentIndex)}>
                          <Icon name="ios-arrow-down" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.flipImage(currentIndex)}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{paddingRight: 10}}>
                              <Icon name="ios-arrow-back" />
                            </View>
                            <View>
                              <Icon name="ios-arrow-forward" />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.duplicateImage(currentIndex)}>
                          <Icon name="ios-copy" style={{}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.removeImage(currentIndex)}>
                          <Icon name="ios-trash" style={{}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.saveImage()}>
                          <Icon name="md-image" style={{}} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    :
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-start',backgroundColor: 'rgba(255,255,255,.9)'}}>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}}
                        >
                            <Icon name="ios-undo" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}}
                        >
                          <Icon name="ios-redo" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1,alignItems: 'center',borderWidth: 1,borderColor: 'rgba(235,235,235,1)'}} onPress={() => this.saveImage()}>
                          <Icon name="md-image" style={{}} />
                        </TouchableOpacity>
                    </View>
                  }
                  </View>
                </View>
            </View>
            <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
              <ScrollMe />
            </View>
          </View>
        </Container>
      );
    } else {
        return (
          <View style={{flex: 1}}>
            <ScrollMe />
          </View>
        );
    }

  }
}

function bindAction(dispatch) {
  return {
    moveCard: (obj, i) => dispatch(moveCard(obj, i)),
    addCard: () => dispatch(addCard()),
    makeActive: i => dispatch(makeActive(i)),
    bringToTop: i => dispatch(bringToTop(i)),
    sendToBack: i => dispatch(sendToBack(i)),
    showAll: () => dispatch(showAll()),
    flipImage: i => dispatch(flipImage(i)),
    duplicateImage: i => dispatch(duplicateImage(i)),
    removeImage: i => dispatch(removeImage(i)),
    addData: (obj) => dispatch(addData(obj))
  };
}

function mapStateToProps(state) {
  return {
    // name: state.user.name,
    index: state.list.selectedIndex,
    list: state.list.list,
    card: state.card.card,
    // show: state.card.show,
    arrowUp: state.card.arrowUp,
    collective: state.card.collective,
    showBar: state.card.showBar,
    allMadeActive: state.card.allMadeActive
  };
}


export default connect(mapStateToProps, bindAction)(App);
