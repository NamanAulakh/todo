
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { moveCard } from '../../actions/card';

import { Container, Header, Title, Content, Text, Button, Icon, View } from 'native-base';
import { StyleSheet, Image } from 'react-native';


import myTheme from '../../themes/base-theme';


import { drag, pinch, GestureView } from 'react-native-gestures';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#565051',
    flex: 1
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
    this.state = {
       top: this.props.card.top,
       left: this.props.card.left,
       width: this.props.card.width,
       height: this.props.card.height,
       rotate:  this.props.card.rotate 
    }
  }

  moveCard(obj) {
    this.props.moveCard(obj);
  }

    popRoute() {
        this.props.popRoute();
    }

    render() {

        const { props: { name, index, list } } = this;

        const movable = {
          backgroundColor: 'green',
          width: this.props.card.width,
          height: this.props.card.height,
          position: 'absolute',
          left: this.props.card.left,
          top: this.props.card.top
        };

        return (
              <View name='Draggable Container' style={styles.container}>
                  <GestureView
                        style={movable}
                        gestures={[drag, pinch]}
                        type="View"
                        toStyle={(layout) => {
                          let rotate = this.state.rotate;
                          this.moveCard(this.state)

                          this.setState({
                            top: layout.y,
                            left : layout.x,
                            width: layout.width,
                            height: layout.height,
                            rotate: layout.rotate ? layout.rotate : rotate 
                          })

                          return {
                            top: this.props.card.top,
                            left: this.props.card.left,
                            width: this.props.card.width,
                            height: this.props.card.height,
                            transform: [{rotate: `${this.props.card.rotate}deg`}]
                          }
                        }}
                        onError={console.error.bind(console)}>
                        <Text>TEST</Text>
                      </GestureView>
                </View>

                  
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        moveCard: (obj) =>dispatch(moveCard(obj))
    }
}

function mapStateToProps(state) {
    return {
        name: state.user.name,
        index: state.list.selectedIndex,
        list: state.list.list,
        card: state.card
    };
}

export default connect(mapStateToProps, bindAction)(BlankPage);
