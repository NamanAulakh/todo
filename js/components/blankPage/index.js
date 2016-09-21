
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { moveCard, addCard } from '../../actions/card';

import { Container, Header, Title, Content, Text, Button, Icon, View } from 'native-base';
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';


import myTheme from '../../themes/base-theme';


import { drag, pinch, GestureView } from 'react-native-gestures';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#565051'
  },

  baseText: {
    fontFamily: 'Cochin',
  },
  
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});


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

    moveCard(obj, i) {
        // console.log("here", i);
        this.props.moveCard(obj, i);
    }

    addCard() {
        this.props.addCard();
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

              <Container theme={myTheme} style={{backgroundColor: '#565051'}}>
                <Header>
                    
                    <Title>{(name) ? name : 'Editor'}</Title>

                    <Button transparent onPress={()=>this.addCard()}>
                        <Icon name='ios-add' />
                    </Button>

                </Header>


                 <View pointerEvents="box-none" name='Draggable Container' style={styles.container}>
                {   
                    this.props.card.map((obj, i)=>{
                        const movable = {
                          backgroundColor: 'green',
                          width: obj.width,
                          height: obj.height,
                          position: 'absolute',
                          left: obj.left,
                          top: obj.top
                        };

                        return <GestureView
                                style={movable}
                                pointerEvents="box-none"
                                onPress={()=>{this.test()}}
                                gestures={[drag]}
                                type="View"
                                toStyle={(layout) => {
                                    let rotate = obj.rotate;
                                    layout.rotate = layout.rotate ? layout.rotate : rotate;
                                    this.moveCard(layout, i)
                                    return {
                                      top: obj.top,
                                      left: obj.left,
                                      width: obj.width,
                                      height: obj.height,
                                      transform: [{rotate: `${obj.rotate}deg`}]
                                  }
                              }}
                              onError={console.error.bind(console)}>
                               <Text>TEST {i}</Text>
                              </GestureView>
                    })
                }

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
        addCard: () =>dispatch(addCard())
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
