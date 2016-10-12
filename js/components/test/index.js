
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TouchableOpacity, View, ScrollView, Image,  Dimensions} from 'react-native';

import {toggle} from '../Editor/actions/card';

import {Container, Header, Title, Content, Text, Button, Icon} from 'native-base';

import myTheme from '../../themes/base-theme';
import styles from './style';

import Icone from '../../../node_modules/react-native-vector-icons/FontAwesome.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Test extends Component {

    static propTypes = {
        toggle: React.PropTypes.func.isRequired
    }
    navigateTo(route, index) {
        this.props.closeDrawer();
        this.props.setIndex(index);
        this.props.replaceOrPushRoute(route);
    }

    toggle()  {
      console.log('toggle:(scrollMe)...');

      this.props.toggle();
      console.log('After toggle: ',this.props.arrowUp);
      //hack
      // if(this.props.arrowUp)  {
      //   this.props.onChange(true);
      // }

      console.log('...toggle:(scrollMe)');

    }

    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps:(scrollMe)...');

      console.log('nextProps: ' , nextProps);

      console.log('...componentWillReceiveProps:(scrollMe)');

    }

    // componentWillMount()  {
    //   console.log('componentWillMount:scrollMe...');
    //
    //   console.log('this.props: ' , this.props);
    //
    //   console.log('...componentWillMount:scrollMe');
    // }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'rgba(238,238,238,1)',}}>
              <View style={{flex:1,}}>
                <View style={{flex:1,backgroundColor:'white',marginVertical:5,flexDirection:'row'}}>
                  <Button transparent style={{flex:1,alignSelf:'center',}} onPress={() => this.toggle()}>
                    <Icon name={this.props.arrowUp ? 'ios-arrow-up' : 'ios-arrow-down'}/>
                  </Button>
                  <TouchableOpacity transparent style={{flex:4,alignSelf:'center',borderBottomWidth:2,marginRight:10,paddingBottom:2}}>
                    <Text>Collective</Text>
                  </TouchableOpacity>
                  <TouchableOpacity transparent style={{flex:4,alignSelf:'center',borderBottomWidth:2,paddingBottom:2}}>
                    <Text>Mijn items</Text>
                  </TouchableOpacity>
                  <Button transparent style={{flex:1,alignSelf:'center'}}>
                    <Icon name='ios-camera-outline'/>
                  </Button>
                </View>
              </View>
              <ScrollView style={{flex:9,marginHorizontal:10,marginTop:15,}}>
                <View style={{flex:1,flexDirection:'row',}}>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',marginRight:15,}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/coversheet/175808492.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,padding:4,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:4,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/sample.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,paddingHorizontal:5,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:'row',paddingTop:15}}>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',marginRight:15,}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/sample.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,padding:4,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:4,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/sample.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,paddingHorizontal:5,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:'row',paddingTop:15}}>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',marginRight:15,}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/sample.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,padding:4,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:4,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1,backgroundColor:'white',}}>
                    <View style={{borderBottomWidth:1,borderColor:'rgba(235,235,235,1)',paddingVertical:5,}}>
                    <Image source={require('../../../images/sample.png')} style={{flex:1,width:deviceWidth/2.35,marginLeft:5}}/>
                    </View>
                    <View style={{flex:3,paddingHorizontal:5,borderBottomWidth:1,borderColor:'rgba(235,235,235,1)'}}>
                      <Text style={{fontSize:12}}>Product title</Text>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:12,color:'rgba(25,25,25,1)'}}>¢ 229,- </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}> / </Text>
                        <Text style={{fontSize:12,color:'rgba(144,144,144,1)'}}>vC 3106 </Text>
                        <Text style={{fontSize:12,color:'rgba(0,182,212,1)'}}>vC 1894</Text>
                      </View>
                    </View>
                    <View style={{flex:2,}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,}}>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-heart-outline'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'rgba(135,135,135,1)'}}>124</Text>
                          </View>
                        </View>
                        <View style={{flexDirection:'row',}}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Icon name='ios-attach'style={{color:'rgba(135,135,135,1)',fontSize:20}}/>
                          </View>
                          <View style={{paddingLeft:20,justifyContent:'center',alignItems:'center'}}>
                            <Icone name='upload'style={{color:'rgba(228,54,104,1)',fontSize:20}}/>
                          </View>
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
        toggle: ()=>dispatch(toggle())
    };
}

function mapStateToProps(state) {
    return {
        card: state.card.card,
        arrowUp: state.card.arrowUp
    };
}

export default connect(mapStateToProps, bindAction)(Test);
