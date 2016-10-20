import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import Editor from '../Editor';
import CustomAnimation from '../customAnimation';
import ScrollMe from '../scrollMe';
import {toggle} from '../../actions/display';

class BlankPage extends Component {
  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    offset: React.PropTypes.any,
    arrowUp: React.PropTypes.any
  }

  onChange(payload) {
    if (payload) {
      console.log('Data(payload) from interior store: ' , payload);
      // this.props.toggle();
    }
  }

  render() {
    var data = [];
    if (this.props.arrowUp)  {
      return (
        <Container>
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
            <View style={{flex: 1}}>
              <View style={{flex: 8}}>
                <Editor onChange={
                    (payload) => {
                      this.onChange(payload);
                    }
                  }
                  data={data}
                />
              </View>
              <View style={{flex: 2}}>
                <CustomAnimation/>
              </View>
            </View>
          </View>
        </Container>
      );
    } else {
      return (
        <Container>
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
            <View style={{flex: 1}}>
              <View style={{flex: 2}}>
                <ScrollMe/>
              </View>
            </View>
          </View>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
    return {
        toggle: ()=>dispatch(toggle())
    };
}

function mapStateToProps(state) {
  return {
      offset: state.display.offset,
      arrowUp: state.display.arrowUp
  };
}


export default connect(mapStateToProps,bindAction)(BlankPage);
