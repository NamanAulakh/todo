
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon} from 'native-base';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import ScrollMe from '../scrollMe';
import {toggle} from '../Editor/actions/card';

class CustomAnimation extends Component {

  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    currentIndex: React.PropTypes.any
  }

  toggle()  {
    this.props.toggle();
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
  }

  render() {
    return (
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
    );
  }
}

function bindAction(dispatch) {
  return {
    toggle: ()=>dispatch(toggle())
  };
}

function mapStateToProps(state) {
  return {
    card: state.card.card,
    currentIndex: state.card.currentIndex
  };
}

export default connect(mapStateToProps,bindAction)(CustomAnimation);
