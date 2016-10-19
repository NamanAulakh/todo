
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity,easing,duration} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';
import clamp from 'clamp';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import ScrollMe from '../scrollMe';
import {toggle,toggleIsAnimating,toggleIsAnimated,setOffset} from '../Editor/actions/card';

class CustomAnimation extends Component {

  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    toggleIsAnimating: React.PropTypes.func.isRequired,
    toggleIsAnimated: React.PropTypes.func.isRequired,
    setOffset: React.PropTypes.func.isRequired,
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

  setOffset(value)  {
    this.props.setOffset(value);
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0};

    this._animatedValue.addListener((value) => this._value = value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
        this._animatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this._animatedValue.x, dy: this._animatedValue.y}
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: (e) => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@' , this._animatedValue.y);
        if (this._animatedValue.y._offset === 0) {
          if (this._animatedValue.y._value > (-1 * (deviceHeight / 4))) {
            console.log('goto borderline');
            Animated.timing(
              this._animatedValue.y,
              {toValue: 0},
              duration: 20000
            ).start();
          } else {
              console.log('goToTop');
              Animated.timing(
                this._animatedValue.y,
                {toValue: deviceHeight > 600 ? ((-1 * (deviceHeight)) + 180) : ((-1 * (deviceHeight)) + 160)},
                duration: 20000
              ).start();
          }
        } else {
          if (this._animatedValue.y._value < deviceHeight / 3)  {
            console.log('...gotoTop');
            Animated.timing(
              this._animatedValue.y,
              {toValue: 0},
              duration: 20000
            ).start();
          } else {
              console.log('...goto borderline');
              Animated.timing(
                this._animatedValue.y,
                {toValue: -1 * this._animatedValue.y._offset},
                duration: 20000
              ).start();
          }
        }
      }
    });
  }

  componentWillReceiveProps(nextProps)  {
    if(!nextProps.arrowUp)  {
      console.log('***gotoTop');

      Animated.timing(
        this._animatedValue.y,
        {toValue: deviceHeight > 600 ? ((-1 * (deviceHeight)) + 180) : ((-1 * (deviceHeight)) + 160)},
        duration: 20000
      ).start();
      console.log('&&&&:100' , this._animatedValue.y);
    } else {
      console.log('***goto borderline');
      console.log('&&&&:108' , this._animatedValue.y);
      Animated.timing(
        this._animatedValue.y,
        {toValue: -1 * this._animatedValue.y._offset},
        duration: 20000
      ).start();
    }
  }

  render() {
    console.log('render:this.props.offset ' , this.props.offset);
      return (
        <View pointerEvents= {this.props.offset === 0 ? "box-none"  : "none"} style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}>
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
    toggleIsAnimated: ()=>dispatch(toggleIsAnimated()),
    setOffset: (value)=>dispatch(setOffset(value))
  };
}

function mapStateToProps(state) {
  return {
    arrowUp: state.card.arrowUp,
    isAnimating: state.card.isAnimating,//decide in which store to put this variable
    isAnimated: state.card.isAnimated,
    offset: state.card.offset
  };
}

export default connect(mapStateToProps,bindAction)(CustomAnimation);
