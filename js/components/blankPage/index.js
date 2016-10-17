import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View, PanResponder, Animated} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import Editor from '../Editor';

import light from '../../themes/light';
import {toggle} from '../../actions/display';

// import DoIt from '../doIt';
// import Product from '../product';
// import ScrollMe from '../scrollMe';

import myTheme from '../../themes/base-theme';

class BlankPage extends Component {
  static propTypes = {
    toggle: React.PropTypes.func.isRequired
  }

  onChange(payload) {
    if (payload) {
      console.log('Data(payload) from interior store: ' , payload);
      // this.props.toggle();
    }
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0};

    this._animatedValue.addListener((value) =>
    {
      this._value = value;
    });

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
          this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
        }
      });
  }

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
    var data = [
        // {
        //   active: 0,
        //   height: 200,
        //   left: 10,
        //   rotate: 0,
        //   rotateBefore: 0,
        //   rotateNow: 0,
        //   scaleX: 1,
        //   scaleY: 1,
        //   top: 100,
        //   url: 'http://babylon.geekydev.com/images/195679393.png',
        //   width: 200
        // },
        // {
        //   active: 0,
        //   height: 200,
        //   left: 10,
        //   rotate: 0,
        //   rotateBefore: 0,
        //   rotateNow: 0,
        //   scaleX: 1,
        //   scaleY: 1,
        //   top: 100,
        //   url: 'http://babylon.geekydev.com/images/170991132.png',
        //   width: 200
        // }
      ];
    return (
      <Container theme={light}>
        <View
        style={{flex: 1}}
        >
          <Header style={{backgroundColor: 'white'}}>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>
              <View>
                <Button transparent>
                    <Icon name="ios-arrow-back" style={{color: 'black'}}/>
                </Button>
              </View>

              <View>
                <Button style={{borderRadius: 0,paddingHorizontal: 20,backgroundColor: 'black'}}>POST</Button>
              </View>

              <View>
                <Button transparent>
                    <Icon name="ios-menu" style={{color: 'black'}}/>
                </Button>
              </View>
            </View>
          </Header>
          <Editor onChange={
              (payload) => {
                this.onChange(payload);
              }
            }
            data={data}
          />
        </View>
      </Container>
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
        display: state.display,
        renderUp: state.renderUp
    };
}


export default connect(mapStateToProps,bindAction)(BlankPage);
