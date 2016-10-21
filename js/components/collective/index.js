import React, {Component} from 'react';
import {connect} from 'react-redux';

import {View,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native';
import {Text,Icon} from 'native-base';
import {toggleHanger} from '../../actions/display';

const deviceHeight = Dimensions.get('window').height;

import Icone from '../../../node_modules/react-native-vector-icons/FontAwesome.js';

class Collective extends Component {

  static propTypes = {
    toggleHanger: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row',paddingTop: 20,paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,marginLeft: 10,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',paddingTop: 10,paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,marginLeft: 10,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',paddingTop: 10,paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flex: 1,marginLeft: 10,borderWidth: 6,borderColor: 'white',backgroundColor: 'white'}}>
            <View>
              <View>
                <View style={{position: 'absolute',backgroundColor: 'black',zIndex: 1,right: -6,top: 20}}>
                  <TouchableOpacity onPress={() => this.props.toggleHanger()} style={{flexDirection: 'row',padding: 5}}>
                    <View style={{marginRight: 4}}>
                    <Icon name="ios-brush"
                    style={{color: 'white',fontSize: 20}}/>
                    </View>
                    <View>
                      <Text style={{fontSize: 11,fontWeight: '900',color: 'white',fontFamily: 'Avenir'}}>VOEG TOE</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Image style={{resizeMode: 'cover',width: null,height: deviceHeight / 4}} source={require('../../../images/gray.jpg')}/>
              </View>
            </View>
            <View style={{padding: 4,borderBottomWidth: 1,borderColor: 'rgba(235,235,235,1)'}}>
              <Text style={{fontSize: 12}}>Product title</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12,color: 'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}> / </Text>
                <Text style={{fontSize: 12,color: 'rgba(144,144,144,1)'}}>vC 3106 </Text>
                <Text style={{fontSize: 12,color: 'rgba(0,182,212,1)'}}>vC 1894</Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',padding: 4}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-heart-outline"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 2,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: 'rgba(135,135,135,1)'}}>124</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Icon name="ios-attach"style={{color: 'rgba(135,135,135,1)',fontSize: 20}}/>
                </View>
                <View style={{paddingLeft: 20,justifyContent: 'center',alignItems: 'center'}}>
                  <Icone name="upload"
                  style={{color: 'rgba(228,54,104,1)',fontSize: 20}}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    );
  }
}

function bindAction(dispatch) {
    return {
        toggleHanger: ()=>dispatch(toggleHanger())
    };
}

function mapStateToProps(state) {
  return {
      hanger: state.display.hanger
  };
}

export default connect(mapStateToProps,bindAction)(Collective);
