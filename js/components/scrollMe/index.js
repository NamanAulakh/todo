
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TouchableOpacity,View, ScrollView} from 'react-native';
import Collective from '../collective';
import MinItems from '../MijnItems/';

import {toggleTab,toggle} from '../../actions/display';
import {Text, Button, Icon} from 'native-base';

class ScrollMe extends Component {

    static propTypes = {
        toggle: React.PropTypes.func.isRequired,
        arrowUp: React.PropTypes.any,
        toggleTab: React.PropTypes.func.isRequired,
        currentTab: React.PropTypes.any
    }

    toggle()  {
      this.props.toggle();
    }

    toggleTab() {
      console.log('toggleTab');
      this.props.currentTab();
    }

    render() {
        return (
            <View
            style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}
            >
              <TouchableOpacity>
                <TouchableOpacity style={{flex: 1,backgroundColor: 'white',flexDirection: 'row'}}>
                  <Button transparent style={{flex: 1,alignSelf: 'center'}} onPress={() => this.toggle()}>
                    <Icon name={this.props.arrowUp ? 'ios-arrow-up' : 'ios-arrow-down'}/>
                  </Button>
                  <TouchableOpacity onPress={() => this.toggleTab()} transparent style={{flex: 4,alignSelf: 'center',borderBottomWidth: this.props.currentTab ? 2 : 1 ,marginRight: 10,borderColor: this.props.currentTab ? 'black' : 'rgba(135,135,135,1)' ,paddingBottom: 2}}>
                    <Text style={{color: this.props.currentTab ? 'black' : 'rgba(135,135,135,1)'}}>Collective</Text>
                  </TouchableOpacity>
                  <TouchableOpacity transparent style={{flex: 4,alignSelf: 'center',borderBottomWidth: this.props.collective ? 0.5 : 2 ,borderColor: this.props.collective ? 'rgba(135,135,135,1)' : 'black' ,paddingBottom: 2}}>
                    <Text style={{color: this.props.currentTab ? 'rgba(135,135,135,1)' : 'black'}}>Mijn items</Text>
                  </TouchableOpacity>
                  <Button transparent style={{flex: 1,alignSelf: 'center'}}>
                    <Icon name= "ios-camera-outline"/>
                  </Button>
                </TouchableOpacity>
              </TouchableOpacity>
              <View
              >
                <ScrollView
                ref="scrollView"
                style={{flex: 9,marginHorizontal: 10,marginTop: 10}}
                >
                  {!this.props.currentTab ? <Collective/> : <MinItems/>}
                </ScrollView>
              </View>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        toggle: ()=>dispatch(toggle()),
        toggleTab: ()=>dispatch(toggleTab())
    };
}

function mapStateToProps(state) {
    console.log('***: ' , state);
    return {
      arrowUp: state.display.arrowUp,
      currentTab: state.display.currentTab,
    };
}

export default connect(mapStateToProps, bindAction)(ScrollMe);
