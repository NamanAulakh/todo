import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {Container, Header, Title, Button, Icon} from 'native-base';
import Editor from '../Editor';

import light from '../../themes/light';
import {toggle} from '../../actions/display';

// import DoIt from '../doIt';
import Product from '../product';
import ScrollMe from '../scrollMe';

class BlankPage extends Component {

  static propTypes = {
    toggle: React.PropTypes.func.isRequired
  }

  onChange(payload) {
    console.log('onChange:BlankPage...');

    if(payload) {
      console.log('Data(payload) from interior store: ' , payload);
      // this.props.toggle();

    }

    console.log('...onChange:BlankPage');

  }

  render() {
    console.log('index.js:BlankPage');
    // const {props: {name}} = this;
    //data to be sent to editor component.
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


          <View style={{flex: 1}}>
            <Header style={{backgroundColor:'white'}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                <View>
                  <Button transparent>
                      <Icon name="ios-arrow-back" style={{color:'black'}}/>
                  </Button>
                </View>

                <View>
                  <Button style={{borderRadius:0,paddingHorizontal:20,backgroundColor:'black',}}>POST</Button>
                </View>

                <View>
                  <Button transparent>
                      <Icon name="ios-menu" style={{color:'black'}}/>
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
