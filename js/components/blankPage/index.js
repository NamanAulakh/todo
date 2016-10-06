import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';
import {Container, Header, Title, Button, Icon} from 'native-base';
import Editor from '../Editor';

import light from '../../themes/light';

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string
  }

  onChange(payload) {
    // console.log('Change reflected in exterior store: ' , payload);
  }

  render() {
    const {props: {name}} = this;
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

export default connect()(BlankPage);
