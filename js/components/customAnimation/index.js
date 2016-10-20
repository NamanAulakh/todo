
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions, PanResponder, View,Animated,duration} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

import ScrollMe from '../scrollMe';
import {toggle,setOffset} from '../../actions/display';

class CustomAnimation extends Component {

  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    setOffset: React.PropTypes.func.isRequired,
    arrowUp: React.PropTypes.any
  }

  toggle()  {
    this.props.toggle();
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
              this.toggle();
              this.setOffset(1);
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
              this.toggle();
              this.setOffset(0);
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
    if (!nextProps.arrowUp)  {
      console.log('***gotoTop');
      this.setOffset(1);
      if (this._animatedValue.y._offset === 0) {
        Animated.timing(
          this._animatedValue.y,
          {toValue: deviceHeight > 600 ? ((-1 * (deviceHeight)) + 180) : ((-1 * (deviceHeight)) + 160)},
          duration: 20000,
        ).start();
      } else {
        Animated.timing(
          this._animatedValue.y,
          {toValue: 0},
          duration: 20000,
        ).start();
      }
    } else {
      console.log('***goto borderline');
      this.setOffset(0);
      Animated.timing(
        this._animatedValue.y,
        {toValue: -1 * this._animatedValue.y._offset},
        duration: 20000
      ).start();
    }
  }

  render() {
      return (
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
          <View pointerEvents= "auto">
            <ScrollMe/>
          </View>
        </Animated.View>
      );
  }
}

function bindAction(dispatch) {
  return {
    toggle: ()=>dispatch(toggle()),
    setOffset: (value)=>dispatch(setOffset(value))
  };
}

function mapStateToProps(state) {
  console.log('CustomAnimation: ' , state);
  return {
    arrowUp: state.display.arrowUp,
    offset: state.display.offset
  };
}

export default connect(mapStateToProps,bindAction)(CustomAnimation);
