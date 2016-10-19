
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TouchableOpacity,View, ScrollView} from 'react-native';
import Collective from '../collective';
import MinItems from '../MijnItems/';

import {toggle} from '../Editor/actions/card';
import {toggleTab} from '../../actions/display';
import {Text, Button, Icon} from 'native-base';

class ScrollMe extends Component {

    static propTypes = {
        toggle: React.PropTypes.func.isRequired,
        arrowUp: React.PropTypes.any,
        collective: React.PropTypes.any,
        toggleTab: React.PropTypes.func.isRequired,
        currentTab: React.PropTypes.any
    }

    toggle()  {
      this.props.toggle();
    }

    toggleTab() {
      this.props.toggleTab();
    }

    scrollEvent() {
      console.log('ScrollEvent');
    }

    render() {
        return (
            <View
            style={{flex: 1,backgroundColor: 'rgba(238,238,238,1)'}}
            >
              <TouchableOpacity>
                <TouchableOpacity style={{flex: 1,backgroundColor: 'white',marginVertical: 5,flexDirection: 'row'}}>
                  <Button transparent style={{flex: 1,alignSelf: 'center'}} onPress={() => this.toggle()}>
                    <Icon name={this.props.arrowUp ? 'ios-arrow-up' : 'ios-arrow-down'}/>
                  </Button>
                  <TouchableOpacity onPress={() => this.toggleTab()} transparent style={{flex: 4,alignSelf: 'center',borderBottomWidth: this.props.collective ? 2 : 1 ,marginRight: 10,borderColor: this.props.collective ? 'black' : 'rgba(135,135,135,1)' ,paddingBottom: 2}}>
                    <Text style={{color: this.props.collective ? 'black' : 'rgba(135,135,135,1)'}}>Collective</Text>
                  </TouchableOpacity>
                  <TouchableOpacity transparent style={{flex: 4,alignSelf: 'center',borderBottomWidth: this.props.collective ? 0.5 : 2 ,borderColor: this.props.collective ? 'rgba(135,135,135,1)' : 'black' ,paddingBottom: 2}}>
                    <Text style={{color: this.props.collective ? 'rgba(135,135,135,1)' : 'black'}}>Mijn items</Text>
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
                  {this.props.collective ? <Collective/> : <MinItems/>}
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
    return {
        card: state.card.card,
        arrowUp: state.card.arrowUp,
        collective: state.card.collective,
        currentTab: state.card.currentTab
    };
}

export default connect(mapStateToProps, bindAction)(ScrollMe);
