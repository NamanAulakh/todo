
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { moveCard, addCard, makeActive, bringToTop } from '../../actions/card';

import { Container, Header, Title, Content, Text, Button, Icon, View } from 'native-base';
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, PanResponder } from 'react-native';


import myTheme from '../../themes/base-theme';


import { drag, pinch, GestureView } from 'react-native-gestures';

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },

  baseText: {
    fontFamily: 'Cochin',
  },
  
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const currentIndex = -1;

class BlankPage extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     top: this.props.card.top,
        //     left: this.props.card.left,
        //     width: this.props.card.width,
        //     height: this.props.card.height,
        //     rotate:  this.props.card.rotate 
        // }
    }

    componentWillMount() {

        this._panResponder = PanResponder.create({
              // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!

            // gestureState.{x,y}0 will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
            // console.log("kaash");
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
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
    test() {
        // alert("hi");
        // console.log("here");
    }

    render() {


        const { props: { name, index, list } } = this;
        return (

              <Container theme={myTheme} style={{backgroundColor: '#565051'}} >
                <Header>
                    
                    <Title>{(name) ? name : 'Editor'}</Title>

                    <Button transparent onPress={()=>this.addCard()}>
                        <Icon name='ios-add' />
                    </Button>

                    <Button transparent onPress={()=>this.bringToTop(currentIndex)}>
                        <Icon name='ios-arrow-up' />
                    </Button>

                </Header>
                <View>
                    <View {...this._panResponder.panHandlers} style={{width: 1000, height: 1000, position:"absolute", backgroundColor: 'transparent'}}>

                    </View>

                    <View pointerEvents="box-none" name='Draggable Container' style={styles.container} >

                    {   
                        this.props.card.map((obj, i)=>{

                            

                            var movable = {
                                width: obj.width,
                                height: obj.height,
                                position: 'absolute',
                                left: obj.left,
                                top: obj.top
                            };

                            // console.log(obj, "here");
                            if(obj.active == 1) {
                                currentIndex = i;
                                movable.backgroundColor = "rgba(76,174,76, 1)";
                                movable.borderRadius = 4;
                                movable.borderWidth = 0.5;
                                movable.borderColor = "#d6d7da";
                            } else {
                                movable.backgroundColor = "rgba(76,174,76, 0.5)";

                            }

                            return <GestureView
                                    key={i}
                                    style={movable}
                                    pointerEvents="box-none"
                                    onPress={()=>{this.test()}}
                                    gestures={[drag, pinch]}
                                    tapCallback={()=>{ this.makeActive(i) }}
                                    onRelease={(x, y, layout)=>{ 
                                        var coordinate = layout;
                                        coordinate.rotateBefore = obj.rotate ? obj.rotate : 0;
                                        coordinate.rotateNow = 0;
                                        this.moveCard(coordinate, i);
                                        this.makeActive(i) 

                                    }}
                                    onMove={()=>{ this.makeActive(i) }}
                                    type="View"
                                    gestureCallback={(layout)=>{}}
                                    toStyle={(layout) => {
                                        var coordinate = layout;
                                        coordinate.rotateNow = layout.rotate ? layout.rotate : 0;
                                        coordinate.rotateBefore = obj.rotateBefore;
                                        coordinate.rotate = coordinate.rotateNow + (coordinate.rotateBefore? coordinate.rotateBefore: 0) ;
                                        this.moveCard(coordinate, i)
                                        return {
                                            top: obj.top,
                                            left: obj.left,
                                            width: obj.width,
                                            height: obj.height,
                                            transform: [{rotate: `${obj.rotate}deg`}]
                                      }
                                  }}
                                  onError={console.error.bind(console)}>
                                   <Text>{i}</Text>
                                  </GestureView>
                        })
                    }

                    </View>
                </View>
                
            </Container>
                  
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        moveCard: (obj, i) =>dispatch(moveCard(obj, i)),
        addCard: () =>dispatch(addCard()),
        makeActive: (i) =>dispatch(makeActive(i)),
        bringToTop: (i) =>dispatch(bringToTop(i))
    }
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
