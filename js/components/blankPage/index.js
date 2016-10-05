import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {Container, Header, Title, Button, Icon} from 'native-base';
import Editor from '../Editor';

import myTheme from '../../themes/base-theme';

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string
  }

  onChange(payload) {
    console.log('Change reflected in exterior store: ' , payload);
  }

  render() {
    const {props: {name}} = this;
    return (

      <Container theme={myTheme} style={{backgroundColor: '#fff'}} >
        <Header>
          <Button transparent>
              <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? name : 'Editor'}</Title>

          <Button transparent>
              <Icon name="ios-menu" />
          </Button>
          </Header>
          <View style={{flex: 1}}>
            <Editor onChange={
              (payload) => {
                this.onChange(payload);
              }
            }
            data={
              [
                {
                  active: 0,
                  height: 200,
                  left: 10,
                  rotate: 0,
                  rotateBefore: 0,
                  rotateNow: 0,
                  scaleX: 1,
                  scaleY: 1,
                  top: 100,
                  url: 'http://babylon.geekydev.com/images/195679393.png',
                  width: 200
                }
              ]
            }
            />
          </View>
      </Container>
        );
  }
}

export default connect()(BlankPage);
