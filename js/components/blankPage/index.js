import React, {Component} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, Dimensions, PanResponder, View} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';
import {moveCard, addCard, makeActive, bringToTop, flipImage, showAll, duplicateImage, removeImage} from '../../actions/card';

import myTheme from '../../themes/base-theme';
import {takeSnapshot} from 'react-native-view-shot';

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
let startHeight = 0;
let startY = 0;
let startX = 0;

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    moveCard: React.PropTypes.func.isRequired,
    addCard: React.PropTypes.func.isRequired,
    bringToTop: React.PropTypes.func.isRequired,
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
  }

  bringToTop(i) {
    this.props.bringToTop(i);
  }

  flipImage(i) {
    this.props.flipImage(i);
  }

  duplicateImage(i) {
    this.props.duplicateImage(i);
  }

  saveImage() {

    // takeSnapshot(this._viewRef, {
    //   format: 'png',
    //   quality: 1
    // })
    // .then(
    //   uri => alert('Image saved to ' + uri),
    //   error => alert('Oops, snapshot failed ' + error)
    // );
    // this.props.saveImage(i);
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

  render() {
    const {props: {name}} = this;
    return (
      <Container theme={myTheme} style={{backgroundColor: '#fff'}} >
        <Header>
          <Button transparent>
              <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? name : 'Editor'}</Title>

          <Button transparent>
              <Icon name="ios-menu" />
          </Button>
        </Header>
        <View style={{flex: 1, overflow: 'hidden'}}
          ref={(child) => {
            this._viewRef = child;
          }} >
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
                startHeight = 0;
                startY = 0;
                startX = 0;
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
                    let scale = layout.scale ? layout.scale : 1;
                    layout.height = startHeight * scale;// childLayout.height;
                    layout.width = startWidth * scale;// * scale;

                    // if (scale > 0) {
                    layout.y = layout.y + startY + (layout.height - startHeight) / 2;//  scale;// * scale;
                    layout.x = layout.x + startX + (layout.width - startWidth) / 2;// * scale;
                    // } else {
                    //   layout.y = layout.y + startY + (layout.height - startHeight) / 2;//  scale;// * scale;
                    //   layout.x = layout.x + startX + (layout.width - startWidth) / 2;// * scale;
                    // }
                    layout.rotate = 0;//layout.rotate ? layout.rotate : 0;
                    this._child.props.toStyle(layout);
                  }
              }}
              onError={()=>{}}
             />
           <View pointerEvents="box-none" name="Draggable Container" style={styles.container} >
            {
              this.props.card.map((obj, i) => {
                const movable = {
                  width: obj.width,
                  height: obj.height,
                  position: 'absolute',
                  left: obj.left,
                  top: obj.top,
                  transform: [{rotate: `${obj.rotateBefore}deg`}, {scaleX: obj.scaleX}, {scaleY: obj.scaleY}]
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
                      coordinate.rotateBefore = obj.rotate ? obj.rotate : 0;
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
                        coordinate.rotateBefore = obj.rotateBefore;
                        coordinate.rotate = coordinate.rotateNow +
                                            (coordinate.rotateBefore ? coordinate.rotateBefore : 0);
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
        <Footer style={{backgroundColor: '#565051'}}>
          <View style={{flexDirection: 'row', padding: 5,  justifyContent: 'space-between', flex: 1, alignSelf: 'stretch'}}>
            <Button transparent onPress={() => this.addCard()}>
              <Icon name="ios-add" />
            </Button>
            <Button transparent onPress={() => this.bringToTop(currentIndex)}>
              <Icon name="ios-arrow-up" />
            </Button>
            <Button transparent onPress={() => this.flipImage(currentIndex)}>
              <Icon name="ios-log-out" />
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
