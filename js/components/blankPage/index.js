import React, {Component} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, Dimensions, PanResponder, View, Text} from 'react-native';
import {Container, Header, Title, Button, Icon} from 'native-base';
import {drag, pinch, GestureView} from 'react-native-gestures';
import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';
import {moveCard, addCard, makeActive, bringToTop} from '../../actions/card';


import myTheme from '../../themes/base-theme';


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

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    moveCard: React.PropTypes.func.isRequired,
    addCard: React.PropTypes.func.isRequired,
    bringToTop: React.PropTypes.func.isRequired,
    makeActive: React.PropTypes.func.isRequired,
    popRoute: React.PropTypes.func.isRequired,
    card: React.PropTypes.any
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
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      //
      // onPanResponderGrant: (evt, gestureState) => {
      //       // The guesture has started. Show visual feedback so the user knows
      //       // what is happening!
      //
      //       // gestureState.{x,y}0 will be set to zero now
      // },
      // onPanResponderMove: (evt, gestureState) => {
      //       // console.log("kaash");
      //       // The most recent move distance is gestureState.move{X,Y}
      //
      //       // The accumulated gesture distance since becoming responder is
      //       // gestureState.d{x,y}
      // },
      // onPanResponderTerminationRequest: (evt, gestureState) => true,
      // onPanResponderRelease: (evt, gestureState) => {
      //       // The user has released all touches while this view is the
      //       // responder. This typically means a gesture has succeeded
      // },
      // onPanResponderTerminate: (evt, gestureState) => {
      //       // Another component has become the responder, so this gesture
      //       // should be cancelled
      // },
      // onShouldBlockNativeResponder: (evt, gestureState) => {
      //       // Returns whether this component should block native components from becoming the JS
      //       // responder. Returns true by default. Is currently only supported on android.
      //   return true;
      // },
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

  makeActive(i) {
    this.props.makeActive(i);
  }


  popRoute() {
    this.props.popRoute();
  }

  render() {
    const {props: {name}} = this;
    return (
      <Container theme={myTheme} style={{backgroundColor: '#565051'}} >
        <Header>
          <Title>{(name) ? name : 'Editor'} </Title>
          <Button transparent onPress={() => this.addCard()}>
            <Icon name="ios-add" />
          </Button>
          <Button transparent onPress={() => this.bringToTop(currentIndex)}>
            <Icon name="ios-arrow-up" />
          </Button>
        </Header>
        <View style={{flex: 1}}>
          <View {...this._panResponder.panHandlers} style={{width: deviceWidth, height: deviceHeight, position: 'absolute', backgroundColor: 'transparent'}} />
          <View pointerEvents="box-none" name="Draggable Container" style={styles.container} >
            {
              this.props.card.map((obj, i) => {
                const movable = {
                  width: obj.width,
                  height: obj.height,
                  position: 'absolute',
                  left: obj.left,
                  top: obj.top,
                  transform: [{rotate: `${obj.rotateBefore}deg`}]
                };

              // console.log(obj, "here");
                if (obj.active === 1) {
                  currentIndex = i;
                  movable.backgroundColor = 'rgba(76,174,76, 1)';
                  movable.borderRadius = 4;
                  movable.borderWidth = 0.5;
                  movable.borderColor = '#d6d7da';
                } else {
                  movable.backgroundColor = 'rgba(76,174,76, 0.5)';
                }

                return (
                  <GestureView
                    key={i}
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
                    type="View"
                    gestureCallback={() => {}}
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
                          transform: [{rotate: `${obj.rotate}deg`}]
                        };


                    }}
                    onError={() => {}}
                  >
                    <Text>{i}</Text>
                  </GestureView>
                );
              })
            }
          </View>
        </View>

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
    bringToTop: i => dispatch(bringToTop(i))
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    index: state.list.selectedIndex,
    list: state.list.list,
    card: state.card.card
  };
}

export default connect(mapStateToProps, bindAction)(BlankPage);
