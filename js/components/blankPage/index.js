import React, {Component} from 'react';
import {connect} from 'react-redux';
import GenerateImage from './../generateImage/index.js';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';
import {moveCard, addCard, makeActive, bringToTop, sendToBack, flipImage, showAll, duplicateImage, removeImage} from '../../actions/card';

import myTheme from '../../themes/base-theme';
import {takeSnapshot} from 'react-native-view-shot';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const imageHeight = 1024/PixelRatio.get();
const imageWidth = 1024/PixelRatio.get();
// function renderCanvas(canvas,images) {
//
//
//   // Canvas demo is from here: http://codepen.io/antoniskamamis/pen/ECrKd
//
//   var ctx = canvas.getContext('2d');
//   var img1 = loadImage(images[0].url, main);
//   var img2 = loadImage('http://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png', main);
//
//   var imagesLoaded = 0;
//
//   function main() {
//
//           // composite now
//           resizeCanvasImage(img1, canvas, 1080, 720);
//           // ctx.drawImage(img1,0,0,img1.width/6,img1.height/6);
//
//   }
//
// function loadImage(src, onload) {
//     // http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
//     var img = new Image();
//
//     img.onload = onload;
//     img.src = src;
//
//
//     console.log('this is image',img)
//     return img;
// }
// function resizeCanvasImage(img, canvas, maxWidth, maxHeight) {
//     var imgWidth = img.width,
//         imgHeight = img.height;
//
//     var ratio = 1, ratio1 = 1, ratio2 = 1;
//     ratio1 = maxWidth / imgWidth;
//     ratio2 = maxHeight / imgHeight;
//
//     // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
//     if (ratio1 < ratio2) {
//         ratio = ratio1;
//     }
//     else {
//         ratio = ratio2;
//     }
//
//     var canvasContext = canvas.getContext("2d");
//     var canvasCopy = document.createElement("canvas");
//     var copyContext = canvasCopy.getContext("2d");
//     var canvasCopy2 = document.createElement("canvas");
//     var copyContext2 = canvasCopy2.getContext("2d");
//     canvasCopy.width = imgWidth;
//     canvasCopy.height = imgHeight;
//     copyContext.drawImage(img, 0, 0);
//
//     // init
//     canvasCopy2.width = imgWidth;
//     canvasCopy2.height = imgHeight;
//     copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
//
//
//     var rounds = 2;
//     var roundRatio = ratio * rounds;
//     for (var i = 1; i <= rounds; i++) {
//         console.log("Step: "+i);
//
//         // tmp
//         canvasCopy.width = imgWidth * roundRatio / i;
//         canvasCopy.height = imgHeight * roundRatio / i;
//
//         copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);
//
//         // copy back
//         canvasCopy2.width = imgWidth * roundRatio / i;
//         canvasCopy2.height = imgHeight * roundRatio / i;
//         copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);
//
//     } // end for
//
//
//     // copy back to canvas
//     canvas.width = imgWidth * roundRatio / rounds;
//     canvas.height = imgHeight * roundRatio / rounds;
//     canvasContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvas.width, canvas.height);
//
//
// }
// }
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    zIndex:1
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
let mainViewHeight,mainViewWidth;

class BlankPage extends Component {
  static flag = 0;
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
    popRoute: React.PropTypes.func.isRequired,
    showAll: React.PropTypes.func.isRequired,
    card: React.PropTypes.any,
    show: React.PropTypes.any
  }
  // constructor(props) {
  //   super(props);
  //
  //       // this.state = {
  //       //     top: this.props.card.top,
  //       //     left: this.props.card.left,
  //       //     width: this.props.card.width,
  //       //     height: this.props.card.height,
  //       //     rotate:  this.props.card.rotate
  //       // }
  // }

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
  moveCard(obj, i) {
        // console.log("here", i);
    this.props.moveCard(obj, i);
  }

  addCard() {
    this.props.addCard();
    console.log('this is card',this.props.card);
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
  getRatio() {
    this._mainView.measure( function (ox, oy,width, height, px, py) {
    mainViewWidth = width;
    mainViewHeight = height;
    console.log("width: " + width);
    console.log("height: " + height);
  })
  return mainViewHeight/mainViewWidth;
  }
  saveImage() {
    BlankPage.flag = 1;
    console.log('blank value is ',BlankPage.flag);
    this._mainView.measure( function (ox, oy,width, height, px, py) {
    mainViewWidth = width;
    mainViewHeight = height;
    console.log("width: " + width);
    console.log("height: " + height);

  })

    this.screenShot();
    // this.props.saveImage(i);
  }

screenShot() {
  takeSnapshot(this._viewRef, {
    format: 'jpg',
    quality: 1
  })
  .then(

    uri =>console.log(uri),
    error => alert('Oops, snapshot failed ' + error)
  );
  BlankPage.flag = 0;
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

  popRoute() {
    this.props.popRoute();
  }
  //
  // componentWillReceiveProps(nextProps) {
  //     let image = (nextProps.image !== this.state.image) ? `${nextProps.picture}?t=${new Date().getTime()}` : nextProps.picture;
  //
  //     this.setState({image: image});
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //     return (nextProps.picture !== this.props.picture);
  // }
componentDidMount() {
  console.log('this is view',this._viewRef);
}
  render() {
    const {props: {name}} = this;
    return (
      <Container theme={myTheme} style={{backgroundColor: '#fff'}} >
        <Header style={{height:60}}>
          <Button transparent>
              <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? name : 'Editor'}</Title>

          <Button transparent>
              <Icon name="ios-menu" />
          </Button>
        </Header>

        <View style={{flex: 1, overflow: 'hidden'}} ref={(child) => {
          this._mainView = child;
        }}>


          <GestureView

              style={{width: deviceWidth, height: deviceHeight,zIndex:1, position: 'absolute', backgroundColor: 'transparent'}}
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
                // console.log("i", obj)
                const movable = {
                  width: obj.width,
                  height: obj.height,
                  position: 'absolute',
                  left: obj.left,
                  top: obj.top,
                  transform: [{rotate: `${obj.rotate ? obj.rotate : (obj.rotateAngle ? obj.rotateAngle : 0)}deg`}, {scaleX: obj.scaleX}, {scaleY: obj.scaleY}]
                };

              // console.log(obj, "here");

              if (this.props.show === true) {
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
                      this.makeActive(i);
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

          <View style={{opacity:0}}>
            <View style={{height:imageHeight, width:imageWidth}} ref={(child) => {
              this._viewRef = child;
            }}>
              <GenerateImage
                data = {this.props.card}
                imageHeight = {imageHeight}
                imageWidh = {imageWidth}
                heightToWidhRatio = {(deviceHeight-115)/deviceWidth}
                />
              </View>
            </View>
        </View>


        <Footer style={{backgroundColor: '#565051'}}>
          <View style={{flexDirection: 'row', padding: 5,  justifyContent: 'space-between', flex: 1, alignSelf: 'stretch'}}>
            <Button transparent onPress={() => this.addCard()}>
                <Icon name="ios-add" />
            </Button>
            <Button transparent onPress={() => this.bringToTop(currentIndex)}>
              <Icon name="ios-arrow-up" />
            </Button>
            <Button transparent onPress={() => this.sendToBack(currentIndex)}>
              <Icon name="ios-arrow-down" />
            </Button>
            <Button transparent onPress={() => this.flipImage(currentIndex)}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon name="ios-arrow-back" style={{paddingRight: 1}}/>
                  <Icon name="ios-arrow-forward" style={{paddingLeft: 1}}/>
                </View>
            </Button>
            <Button transparent onPress={() => this.duplicateImage(currentIndex)}>
              <Icon name="ios-copy" />
            </Button>
            <Button transparent onPress={() => this.removeImage(currentIndex)}>
              <Icon name="ios-trash" />
            </Button>
            <Button transparent onPress={() => this.saveImage()}>
              <Icon name="md-image" />
            </Button>
        </View>
        </Footer>
      </Container>

        );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: () => dispatch(popRoute()),
    moveCard: (obj, i) => dispatch(moveCard(obj, i)),
    addCard: () => dispatch(addCard()),
    makeActive: i => dispatch(makeActive(i)),
    bringToTop: i => dispatch(bringToTop(i)),
    sendToBack: i => dispatch(sendToBack(i)),
    showAll: () => dispatch(showAll()),
    flipImage: i => dispatch(flipImage(i)),
    duplicateImage: i => dispatch(duplicateImage(i)),
    removeImage: i => dispatch(removeImage(i))
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    index: state.list.selectedIndex,
    list: state.list.list,
    card: state.card.card,
    show: state.card.show
  };
}

export default connect(mapStateToProps, bindAction)(BlankPage);
