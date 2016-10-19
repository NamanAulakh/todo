
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity,easing,duration} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';
import clamp from 'clamp';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import ScrollMe from '../scrollMe';
import {toggle,toggleIsAnimating,toggleIsAnimated} from '../Editor/actions/card';

class CustomAnimation extends Component {

  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    toggleIsAnimating: React.PropTypes.func.isRequired,
    toggleIsAnimated: React.PropTypes.func.isRequired,
    arrowUp: React.PropTypes.any,
    isAnimating: React.PropTypes.any,
    isAnimated: React.PropTypes.any
  }

  toggle()  {
    this.props.toggle();
  }

  toggleIsAnimating()  {
    this.props.toggleIsAnimating();
  }

  toggleIsAnimated()  {
    this.props.toggleIsAnimated();
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
        onPanResponderRelease: (e, {vy}) => {
          // this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
          var velocity;
          console.log('vy: ' , vy);
          if (vy >= 0) {
                    velocity = clamp(vy, 4.5, 10);
                    console.log('velocity: ' , velocity);
                } else if (vy < 0) {
                    velocity = clamp(vy * -1, 4.5, 10) * -1;
                    console.log('velocity: ' , velocity);
                }


          console.log('@@@@@@@@@@@@@@@@@@@@@@@@' , this._animatedValue.y);
          if (this._animatedValue.y._offset === 0) {
            if (this._animatedValue.y._value > 0) {
              console.log('below borderline');
              // this._animatedValue.setValue({x: 0, y: 0});
              Animated.timing(          // Uses easing functions
                this._animatedValue.y,    // The value to drive
                {toValue: 0},
                duration: 20000        // Configuration
              ).start();
            } else {
              console.log('above borderline');
              if (this._animatedValue.y._value > -1 * (deviceHeight / 4))  {
                // this._animatedValue.setValue({x: 0, y: 0});
                Animated.timing(          // Uses easing functions
                  this._animatedValue.y,    // The value to drive
                  {toValue: 0},
                  duration: 20000        // Configuration
                ).start();
              } else {
                console.log('goToTop');
                console.log('this._animatedValue.y._value: ' , this._animatedValue.y._value);
                self.toggleIsAnimating();
                // this._animatedValue.setOffset({x: 0, y: 0});
                // this._animatedValue.setValue({x: 0, y: 0});
                Animated.timing(          // Uses easing functions
                  this._animatedValue.y,    // The value to drive
                  {toValue: deviceHeight > 600 ? ((-1 * (deviceHeight)) + 180) : ((-1 * (deviceHeight)) + 160)},
                  duration: 20000        // Configuration
                ).start();

                setTimeout(()=>{
                  console.log('+++++' , self.props.isAnimating);
                  if(self.props.isAnimating)  {
                    self.toggleIsAnimated();
                    self.toggleIsAnimating();
                    console.log('self.props.isAnimating: ' , self.props.isAnimating);
                    console.log('self.props.isAnimated: ' , self.props.isAnimated);
                  } else {
                    console.log('else');
                  }
                },2000);
                // this._animatedValue.setValue({x: 0, y: -1 * (deviceHeight / 2 + 37)});
                // self.toggle();
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
  }

  componentWillReceiveProps(nextProps)  {
    console.log('nextProps: ' , nextProps);
    if(!nextProps.arrowUp)  {
      // this._animatedValue.setOffset({x: 0, y: 0});
      // this._animatedValue.setValue({x: 0, y: 0});
      Animated.timing(          // Uses easing functions
        this._animatedValue.y,    // The value to drive
        {toValue: deviceHeight > 600 ? ((-1 * (deviceHeight)) + 180) : ((-1 * (deviceHeight)) + 160)},
                // Configuration
      ).start();
      // this.toggleIsAnimating();
      // setTimeout(() => {
      //   this.toggleIsAnimated();
      // },2000);
    } else {
      Animated.timing(          // Uses easing functions
        this._animatedValue.y,    // The value to drive
        {toValue: 0},
                // Configuration
      ).start();
    }
  }

  render() {
    console.log('@@@@@@@' , this._animatedValue.y);
      return (
        <View pointerEvents= {this.props.isAnimated ? "none"  : "box-none"} style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
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
      );
  }
}

function bindAction(dispatch) {
  return {
    toggle: ()=>dispatch(toggle()),
    toggleIsAnimating: ()=>dispatch(toggleIsAnimating()),
    toggleIsAnimated: ()=>dispatch(toggleIsAnimated())
  };
}

function mapStateToProps(state) {
  return {
    arrowUp: state.card.arrowUp,
    isAnimating: state.card.isAnimating,//decide in which store to put this variable
    isAnimated: state.card.isAnimated
  };
}

export default connect(mapStateToProps,bindAction)(CustomAnimation);
