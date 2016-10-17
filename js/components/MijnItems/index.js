import React, {Component} from 'react';
import {View, Text, Image, Dimensions,ScrollView} from 'react-native';
import {Container, Header, Title, Button, Icon, InputGroup, Input
} from 'native-base';
var {height, width} = Dimensions.get('window');
const images = [
  {
    url: 'http://babylon.geekydev.com/images/170991132.png',
    height: 400,
    width: 188
  },
  {
    url: 'http://babylon.geekydev.com/images/181547901.png',
    height: 400,
    width: 247
  },
  {
    url: 'http://babylon.geekydev.com/images/183270113.png',
    height: 400,
    width: 377
  },
  {
    url: 'http://babylon.geekydev.com/images/184019230.png',
    height: 400,
    width: 336
  },
  {
    url: 'http://babylon.geekydev.com/images/175808492.png',
    height: 172,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/182010866.png',
    height: 340,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/183304240.png',
    height: 400,
    width: 378
  },
  {
    url: 'http://babylon.geekydev.com/images/177082432.png',
    height: 400,
    width: 149
  },
  {
    url: 'http://babylon.geekydev.com/images/183369275.png',
    height: 400,
    width: 124
  },
  {
    url: 'http://babylon.geekydev.com/images/181180070.png',
    height: 340,
    width: 400
  },
  {
    url: 'http://babylon.geekydev.com/images/182718890.png',
    height: 400,
    width: 302
  },
  {
    url: 'http://babylon.geekydev.com/images/183887580.png',
    height: 400,
    width: 388
  },
  {
    url: 'http://babylon.geekydev.com/images/195679393.png',
    height: 400,
    width: 350
  }
];

class MinItems extends Component {
  componentDidMount() {

    console.log('device',width)
  }
  render() {
    var height1,height2,height3;
    return(
      <View style = {{flex:1,backgroundColor:'white'}}>
        <View style = {{backgroundColor: 'rgba(238,238,238,1)'}}>
          <View style = {{flexDirection:'row',marginHorizontal:10,marginVertical:15}}>
          <Button transparent style={{height:  30, marginTop: 2}}>
            <Icon name = 'md-search'/>
          </Button>
            <InputGroup borderType='regular' style={{backgroundColor:'white',flexDirection:'row',flex:1,height: 30}}>
              <Input style = {{color:'black',marginTop:-5,fontWeight:'bold'}} placeholder='Zoekterm'/>
            </InputGroup>
            </View>
        </View>
        <View>
          <View style={{backgroundColor:'white', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, alignItems:'center', borderBottomColor: 'rgba(238,238,238,1)', borderBottomWidth: 1}}>
            <Text>Mijn liked items</Text>
            <Icon style = {{fontSize: 20,color: 'rgba(199,199,199,1)'}} name = 'ios-arrow-forward'/>
          </View>
          <View style={{backgroundColor:'white', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, alignItems:'center', borderBottomColor: 'rgba(238,238,238,1)', borderBottomWidth: 1}}>
            <Text>Mijn liked items</Text>
            <Icon style = {{fontSize: 20,color: 'rgba(199,199,199,1)'}} name = 'ios-arrow-forward'/>
          </View>
        </View>
        <ScrollView>
          <View style={{flex:1,flexDirection: 'row'}}>
          <View>
            {images.slice(images.length*2/3,images.length).map(function(item,i) {
              height1 += item.height/item.width*width/3;
              console.log('hi this is height',height1)
              return(
                <View key = {i} style = {{backgroundColor:'white', borderColor:'rgba(238,238,238,1)',borderWidth : 0.5,padding:5}}>
                  <Image source={{uri : item.url}} style={{zIndex:1,height:(item.height/item.width)*(width/3-10),width:(width/3-10)}} />
                </View>
              )
            })}
          </View>
          <View>
            {images.slice(images.length/3,images.length*2/3).map(function(item,i) {
              return(
                <View key = {i} style = {{backgroundColor:'white', borderColor:'rgba(238,238,238,1)',borderWidth : 0.5,padding:5}}>
                  <Image source={{uri : item.url}} style={{zIndex:1,height:(item.height/item.width)*(width/3-10),width:(width/3-10)}} />
                </View>
              )
            })}
          </View>
            <View>
              {images.slice(0,images.length/3).map(function(item,i) {
                return(
                  <View key = {i} style = {{backgroundColor:'white', borderColor:'rgba(238,238,238,1)',borderWidth : 0.5,padding:5}}>
                    <Image source={{uri : item.url}} style={{zIndex:1,height:(item.height/item.width)*(width/3-10),width:(width/3-10)}} />
                  </View>
                )
              })}
            </View>


          </View>
        </ScrollView>


      </View>
    )
  }
}
export default MinItems;
