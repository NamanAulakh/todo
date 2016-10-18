
import React, {Component} from 'react';
import {connect} from 'react-redux';


import GenerateImage from './generateImage';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {moveCard, addCard, makeActive, bringToTop, sendToBack, flipImage, showAll, duplicateImage, removeImage,addData, takeScreenshot, toggle} from './actions/card';

import ScrollMe from '../scrollMe';

import {takeSnapshot} from 'react-native-view-shot';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const imageHeight = 1024 / PixelRatio.get();
const imageWidth = 1024 / PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: deviceWidth,
    height: deviceHeight
  }
});

let currentIndex = -1;
let startWidth = 0;
// let startRotate = 0;
let startHeight = 0;
let startY = 0;
let startX = 0;
let screenshotWidth = 0;
let screenshotHeight = 0;

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
    showAll: React.PropTypes.func.isRequired,
    addData: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    toggle: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    showBar: React.PropTypes.any,
    allMadeActive: React.PropTypes.any,
    arrowUp: React.PropTypes.any,
    takeScreenshot: React.PropTypes.func.isRequired,
    show: React.PropTypes.any,
    data: React.PropTypes.any,
    screenshot: React.PropTypes.any
  }

  componentWillMount() {
    var self = this;
    this._animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0};

    this._animatedValue.addListener((value) => this._value = value);

    this._panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
        onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
        onPanResponderGrant: (e, gestureState) => {
          this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
          this._animatedValue.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
          null, {dx: this._animatedValue.x, dy: this._animatedValue.y}
        ]), // Creates a function to handle the movement and set offsets
        onPanResponderRelease: () => {
          // this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning

          console.log('@@@@@@@@@@@@@@@@@@@@@@@@' , this._animatedValue.y);
          if (this._animatedValue.y._offset === 0) {
            if (this._animatedValue.y._value > 0) {
              console.log('below borderline');
              this._animatedValue.setValue({x: 0, y: 0});
            } else {
              console.log('above borderline');
              if (this._animatedValue.y._value > -1 * (deviceHeight / 4))  {
                this._animatedValue.setValue({x: 0, y: 0});
              } else {
                console.log('goToTop');
                this._animatedValue.setOffset({x: 0, y: 0});
                this._animatedValue.setValue({x: 0, y: 0});
                // this._animatedValue.setValue({x: 0, y: -1 * (deviceHeight / 2 + 37)});
                self.toggle();
              }
            }
          } else {
            if ((this._animatedValue.y._value + this._animatedValue.y._offset) > 0)  {
              console.log('...below borderline');
              console.log('@@@ ' , this._animatedValue.y._value + this._animatedValue.y._offset);
              this._animatedValue.setOffset({x: 0, y: 0});
              this._animatedValue.setValue({x: 0, y: 0});
            } else {
              console.log('...above borderline');
              console.log('... ' , this._animatedValue.y._value + this._animatedValue.y._offset);
              if (this._animatedValue.y._value + this._animatedValue.y._offset > -150)  {
                console.log('goto borderline');
                this._animatedValue.setOffset({x: 0, y: 0});
                this._animatedValue.setValue({x: 0, y: 0});
              } else {
                console.log('...gotoTop');
                this._animatedValue.setOffset({x: 0, y: 0});
                this._animatedValue.setValue({x: 0, y: 0});
                // this._animatedValue.setValue({x: 0, y: -1 * (deviceHeight / 2 + 37)});
                self.toggle();
              }
            }
          }
        }
      });
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
  // componentDidUpdate () {
  //   console.log('brbvrhvribvibib',this.props.screenshot);
  //
  //
  //
  //
  // }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps : componentWillReceiveProps(App.js:Editor): ' , nextProps);
    // this.props.onChange(nextProps);
  }

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

  takeScreenshot() {
    this.props.takeScreenshot();
  }

  saveImage() {
    this.takeScreenshot();
    setTimeout(()=>{
      if(this.props.screenshot) {
        takeSnapshot(this._viewRef, {
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
    if (this.props.arrowUp)  {
      return (
          <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
            <View style={{flex: 9, paddingHorizontal: 10, overflow: 'hidden'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Collage / Dressed like a princess</Text>
                </View>
                <View style={{flex: 9, backgroundColor: 'white', marginBottom: 10, overflow: 'hidden'}}>
                  <View
                    style={{flex: 12}}
                    onLayout = {
                      (event) => {
                      var {x, y, width, height} = event.nativeEvent.layout;
                      console.log('thi is Dimensions',width,height);
                      screenshotWidth = width;
                      screenshotHeight = height;
                    }}>
                    <GestureView
                        style={{width: deviceWidth, height: deviceHeight, position: 'absolute', backgroundColor: 'transparent'}}
                        type="View"
                        gestures={[drag, pinch]}
                        tapCallback={() => {
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
                  </View>
                </View>
            </View>
            <View style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
              <Animated.View
              style=
              {[
                {
                  transform: [
                    {translateY: this._animatedValue.y}
                  ]
                }
              ]}
              {...this._panResponder.panHandlers}
              >
                <ScrollMe/>
              </Animated.View>
            </View>
          <View style={{flex:1,opacity:0}} pointerEvents="none">
            <View style={{height:imageHeight, width:imageWidth, backgroundColor: 'transparent'}} ref={(child) => {
              this._viewRef = child;
              }}>
              {this.props.screenshot ?
              <GenerateImage data = {this.props.card}
              imageHeight = {imageHeight}
              imageWidh = {imageWidth}
              heightToWidhRatio = {screenshotHeight/screenshotWidth}
              />
              :
              <View/>}
            </View>
          </View>
          </View>
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
    index: state.list.selectedIndex,
    list: state.list.list,
    card: state.card.card,
    arrowUp: state.card.arrowUp,
    collective: state.card.collective,
    showBar: state.card.showBar,
    allMadeActive: state.card.allMadeActive,
    show: state.card.show,
    screenshot: state.card.screenshot
  };
}


export default connect(mapStateToProps, bindAction)(App);
