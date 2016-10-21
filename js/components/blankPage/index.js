import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View,Text,Dimensions,Image} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import Editor from '../Editor';
import CustomAnimation from '../customAnimation';
import ScrollMe from '../scrollMe';
import {toggle} from '../../actions/display';

// const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class BlankPage extends Component {
  static propTypes = {
    toggle: React.PropTypes.func.isRequired,
    offset: React.PropTypes.any,
    arrowUp: React.PropTypes.any,
    hanger: React.PropTypes.any
  }

  onChange(payload) {
    if (payload) {
      console.log('Data(payload) from interior store: ' , payload);
      // this.props.toggle();
    }
  }

  render() {
    var data = [];
      return (
          <Container style={{backgroundColor: 'rgba(238,238,238,1)'}}>
            <Header style={{backgroundColor: 'white'}}>
              <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>
                <View>
                  <Button transparent>
                      <Icon name="ios-arrow-back" style={{color: 'black'}}/>
                  </Button>
                </View>

                <View>
                  <Button style={{borderRadius: 0,paddingHorizontal: 30,backgroundColor: 'black',height: 35}}>
                    <View>
                      <Text style={{color: 'white',fontWeight: '900',fontFamily: 'Avenir'}}>POST</Text>
                    </View>
                  </Button>
                </View>

                <View>
                  <Button transparent>
                      <Icon name="ios-menu" style={{color: 'black'}}/>
                  </Button>
                </View>
              </View>
            </Header>
              {
                this.props.arrowUp ?
                  <View>
                    <View>
                      <View style={{justifyContent: 'center',paddingTop: 5}}>
                        <View style={{paddingHorizontal: 10,paddingTop: 5}}>
                          <Text style={{fontFamily: 'HarrietDisplay-MediumItalic',fontSize: 17}}>Collage / Dressed like a princess</Text>
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        {
                          this.props.hanger ?
                          <View style={{height: deviceWidth + 20,width: deviceWidth - 20}}>
                            <View style={{marginLeft: 10,marginRight: 10}}>
                              <Image resizeMode = "contain" style={{height: deviceWidth,width: deviceWidth - 20}} source={require('../../../images/Hanger.png')}/>
                            </View>
                          </View>
                          :
                          <View style={{height: deviceWidth,width: deviceWidth,marginTop: 10}}>
                            <Editor onChange={
                                (payload) => {
                                  this.onChange(payload);
                                }
                              }
                              data={this.data}
                            />
                          </View>
                        }
                      </View>
                    </View>
                    <CustomAnimation/>
                  </View>
                :
                  <View style={{flex: 1}}>
                    <ScrollMe/>
                  </View>
              }
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
      offset: state.display.offset,
      arrowUp: state.display.arrowUp,
      hanger: state.display.hanger
  };
}


export default connect(mapStateToProps,bindAction)(BlankPage);



// <Editor onChange={
//     (payload) => {
//       this.onChange(payload);
//     }
//   }
//   data={this.data}
// />


// <View style={{height: deviceWidth + 20,width: deviceWidth - 20}}>
//   <View style={{marginLeft: 10,marginRight: 10}}>
//     <Image resizeMode = 'contain' style={{height: deviceWidth,width: deviceWidth - 20}} source={require('../../../images/Hanger.png')}/>
//   </View>
// </View>
