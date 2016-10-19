import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import Editor from '../Editor';

import light from '../../themes/light';
import {toggle} from '../../actions/display';

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
    var data = [];
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
