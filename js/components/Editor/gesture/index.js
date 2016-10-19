
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Dimensions, PanResponder, View,Text,PixelRatio, Animated, TouchableOpacity,TextInput,Alert} from 'react-native';
import {Container, Header, Footer, Title, Button, Icon, InputGroup, Input} from 'native-base';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import {showAll,  moveCard, makeActive, changeCurrentIndex, updateText} from '../actions/card';

import {drag, pinch, GestureView} from 'react-native-gestures';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: deviceWidth,
    height: deviceHeight
  }
});

let startWidth = 0;
// let startRotate = 0;
let startHeight = 0;
let startY = 0;
let startX = 0;

class Gesture extends Component {

  static propTypes = {
    showAll: React.PropTypes.func.isRequired,
    moveCard: React.PropTypes.func.isRequired,
    makeActive: React.PropTypes.func.isRequired,
    changeCurrentIndex: React.PropTypes.func.isRequired,
    updateText: React.PropTypes.func.isRequired,
    currentIndex: React.PropTypes.any,
    allMadeActive: React.PropTypes.any
  }

  moveCard(obj, i) {
    this.props.moveCard(obj, i);
  }

  makeActive(i) {

    this.props.makeActive(i);
    if (this.refs[i]) {
    this.refs[i]._textInput.focus();
  }
}
  updateText(text,i) {
    console.log("frfr",i);
    this.props.updateText(text,i);
  }

  showAll() {

    this.props.showAll();
    if (this.refs[this.props.currentIndex]) {
      this.refs[this.props.currentIndex]._textInput.setNativeProps({'editable':false});
    }

  }

  changeCurrentIndex(index) {
    this.props.changeCurrentIndex(index);
  }

  componentWillReceiveProps(nextProps) {
    this.props.card.map((obj, i) => {
    if (this.props.allMadeActive) {
      console.log('this.props.allMadeActive');
    } else {
      if (obj.active === 1) {
        this.changeCurrentIndex(i);
      } else {
        console.log('movable.opacity = 0.5');
      }
    }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <GestureView
        style={{width: deviceWidth, height: deviceHeight, position: 'absolute', backgroundColor: 'transparent'}}
        type="View"
        gestures={[drag, pinch]}
        tapCallback={() => {
          console.log('yo');
          this.changeCurrentIndex(-1);
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
            coordinate.rotateAngle = this.props.card[this.props.currentIndex].rotate ? this.props.card[this.props.currentIndex].rotate : 0;
            coordinate.rotateNow = 0;
            this.moveCard(coordinate, this.props.currentIndex);
          }
        }}
        onMove={() => {}}
        gestureCallback={() => {}}
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
              var autoFocus = true;
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
                // this.changeCurrentIndex(i);
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
                  pointerEvents="box-none"
                  key={i}
                  type={obj.type}
                  style={movable}

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
                >
                <View pointerEvents="none">
                  <InputGroup  borderType='transparent' style=  {{borderWidth:0}} >
                          <Input
                            ref = {i}
                            value = {obj.text}
                           multiline = {true}
                           autoFocus = {obj.autoFocus}
                           style = {{height:obj.height,width:obj.width,borderBottomColor:'transparent',borderBottomWidth:0}}
                           onChangeText = {(text)=>{this.updateText(text,i)}}
                           placeholder='Type your text here'/>
                  </InputGroup>
                </View>
                </GestureView>


              );
            })
          }
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    moveCard: (obj, i) => dispatch(moveCard(obj, i)),
    showAll: () => dispatch(showAll()),
    makeActive: i => dispatch(makeActive(i)),
    changeCurrentIndex: i => dispatch(changeCurrentIndex(i)),
    updateText: (text,i) => dispatch(updateText(text,i))
  };
}

function mapStateToProps(state) {
  return {
    card: state.card.card,
    currentIndex: state.card.currentIndex,
    allMadeActive: state.card.allMadeActive
  };
}

export default connect(mapStateToProps,bindAction)(Gesture);
