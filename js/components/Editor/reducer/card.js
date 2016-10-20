
'use strict';

import type {Action} from '../actions/types';
import {MOVE_CARD, ADD_IMAGE, MAKE_ACTIVE, BRING_TO_TOP, SEND_TO_BACK, FLIP_IMAGE, DUPLICATE_IMAGE, REMOVE_IMAGE, SHOW_ALL,DATA,TAKE_SCREENSHOT,CHANGE_CURRENT_INDEX,UPDATE_TEXT,ADD_TEXT,ADD_DATA} from '../actions/card';

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

export type State = {
  card: Array,
  arrowUp: boolean,
  allMadeActive: boolean,
  screenshot: boolean
}

const initialState = {
    card: [],
    arrowUp: true,
    allMadeActive: false,
    screenshot: false,
    currentIndex: -1
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addImage(arr) {

  var newArr = [];
  arr.map(function(elem,i)  {
      var obj = elem;
      obj.active = 0;
      newArr.push(obj);
  });
  let image = images[getRandomInt(0, images.length - 1)];
  newArr.push({
      top: 100,
      left: 10,
      height: image.height / 2,//getRandomInt(100, 200),
      width: image.width / 2,//getRandomInt(100, 200),
      rotate: 0,
      active: 1,
      rotateAngle: 0,
      rotateNow: 0,
      scaleX: 1,
      scaleY: 1,
      url: image.url,//'../../../images/logo.png'
      type: 'Image'
  });
  return newArr;

}

function updateText(text,index,arr) {
  // console.log('index',index);
  var newArr = [];
  arr.map(function(elem,i)  {
      var obj = elem;
      if (index === i) {
          obj.text = text;
      } else {
        obj.text = elem.text;
      }
      newArr.push(obj);
  });

  return newArr;
}

function addText(arr,payload) {
  var newArr = [];
  // console.log('+++++++++++++++++++==================+++++++++++++',payload);
  arr.map(function(elem,i)  {
      var obj = elem;
      obj.active = 0;
      newArr.push(obj);
  });

  newArr.push({
      top: 100,
      left: 10,
      height: 50,//getRandomInt(100, 200),
      width: 100,//getRandomInt(100, 200),
      rotate: 0,
      active: 1,
      rotateAngle: 0,
      rotateNow: 0,
      scaleX: 1,
      scaleY: 1,
      type: 'View',
      text: payload
  });
  return newArr;
}

function move(index, arr, payload) {
  // console.log('++++++++++++++++moving+++++++++',payload);
  var newArr = [];
  arr.map(function(elem,i)  {
    var obj = elem;
    // console.log('37483748384838',obj);
    if (index === i) {
      if(elem.type === 'View') {
        obj.top = payload.y;
        obj.left = payload.x;
        obj.height = payload.height;
        obj.width = payload.width;
        obj.rotate = payload.rotate;
        obj.rotateNow = payload.rotateNow;
        obj.rotateAngle = payload.rotateAngle;
        obj.scaleX = elem.scaleX;
        obj.scaleY = elem.scaleY;
        obj.active = elem.active;
        obj.text = elem.text;
        obj.type = elem.type;
      } else {
        obj.top = payload.y;
        obj.left = payload.x;
        obj.height = payload.height;
        obj.width = payload.width;
        obj.rotate = payload.rotate;
        obj.rotateNow = payload.rotateNow;
        obj.rotateAngle = payload.rotateAngle;
        obj.scaleX = elem.scaleX;
        obj.scaleY = elem.scaleY;
        obj.active = elem.active;
        obj.url = elem.url;
        obj.type = elem.type;

      }

    }
    newArr.push(obj);
  });

  return newArr;
}

function active(index, arr) {
    // console.log('hi I m in on move',arr);
    var newArr = [];
    arr.map(function(elem,i)  {
        var obj = elem;
        if (index === i) {
            obj.active = 1;

        } else {
            obj.active = 0;

        }
        newArr.push(obj);
          // console.log('hi I m in on move',obj.active);
    });

    return newArr;
}

function bringToTop(index, arr) {
    var newArr = [];
    var lastItem = null;

    arr.map(function(elem, i)  {
        var obj = elem;
        if (index === i) {
            lastItem = obj;
        } else {
            newArr.push(obj);
        }
    });

    if (lastItem) {
        newArr.push(lastItem);
    }

    return newArr;
}

function sendToBack(index, arr) {
    var newArr = [];
    var lastItem = null;

    arr.map(function(elem, i)  {
         var obj = elem;
        if (index === i) {
            lastItem = obj;
        } else {
            newArr.push(obj);
        }
    });

    if (lastItem) {
        newArr.unshift(lastItem);
        // console.log('888888888888888888888 - -- This is lastItem',lastItem);
    }

    return newArr;
}

function showAll(arr) {
  var newArr = [];

  arr.map(function(elem, i)  {
      var obj = elem;
      obj.active = 0;
      newArr.push(obj);
  });

  return newArr;

}

function flipImage(index, arr) {
    var newArr = [];

    arr.map(function(elem, i)  {
        var obj = elem;
        // console.log(obj.rotateAngle);
        if (index === i) {
          if ((obj.rotateAngle % 360 < -45 && obj.rotateAngle % 360 > -135) ||
              (obj.rotateAngle % 360 > 45 && obj.rotateAngle % 360 < 136) ||
              (obj.rotateAngle % 360 > 225 && obj.rotateAngle % 360 < 315) ||
              (obj.rotateAngle % 360 < -315 && obj.rotateAngle % 360 > 45)) {
            obj.scaleY = -obj.scaleY;
          } else {
            obj.scaleX = -obj.scaleX;
          }
        }
        newArr.push(obj);
    });
    return newArr;
}

function duplicateImage(index, arr) {
    var newArr = [];
    var item = null;
    arr.map(function(elem, i)  {
        var obj = elem;
        if (index === i) {
            item = obj;
            item.active = 0;
        }
        newArr.push(obj);
    });

    if (item) {
        let newItem = {};
        newItem.top = item.top + 20;
        newItem.left = item.left + 20;
        newItem.height = item.height;
        newItem.width = item.width;
        newItem.rotate = item.rotate;
        newItem.rotateNow = item.rotateNow;
        newItem.rotateAngle = item.rotateAngle;
        newItem.scaleX = item.scaleX;
        newItem.scaleY = item.scaleY;
        newItem.active = 1;
        newItem.type = item.type;
        if(newItem.type === "Image")
        newItem.url = item.url;
        if(newItem.type === "View")
        newItem.text = item.text;

        newArr.push(newItem);

    }

    return newArr;
}

function removeImage(index, arr) {
    var newArr = [];
    arr.map(function(elem, i)  {
        var obj = elem;
        if (index !== i) {
          newArr.push(obj);
        }
    });

    return newArr;
}

export default function (state:State = initialState, action:Action): State {

  // console.log('Interior store: ' , action);

  if (action.type === SHOW_ALL) {
    return {
      ...state,
      card: [...showAll(state.card)],
      show: true,
      showBar: false,
      allMadeActive: true
    };
  }

  if (action.type === MAKE_ACTIVE) {
    return {
      ...state,
      card: [...active(action.index, state.card)],
      show: false,
      showBar: true,
      allMadeActive: false
    };
  }

  if (action.type === MOVE_CARD) {
    return {
      ...state,
      card: [...move(action.index, state.card, action.payload)],
      show: true,
      showBar: state.allMadeActive ? false : true
    };
  }

  if (action.type === ADD_IMAGE) {
    state.allMadeActive = false;
       return {
           ...state,
           card: [...addImage(state.card)],
           show: false,
           showBar: false
       };
  }

  if (action.type === ADD_TEXT) {
       return {
           ...state,
           card: [...addText(state.card, action.payload)],
           show: false,
           showBar: false
       };
  }

  if (action.type === TAKE_SCREENSHOT) {
      state.screenshot = !state.screenshot;
      return {
          ...state
      };
  }

  if (action.type === CHANGE_CURRENT_INDEX) {
      state.currentIndex = action.index;
      return {
          ...state
      };
  }

  if (action.type === ADD_DATA) {

      // let image = images[getRandomInt(0, images.length - 1)];
      action.payload.map(
        (element,index) => {
          state.card = [...state.card, element];
        }
      );
       return {
           ...state,
           show: false
       };


  }

  if (action.type === BRING_TO_TOP) {
      return {
          ...state,
          card: [...bringToTop(action.index, state.card)],
          show: state.show
      };
  }

  if (action.type === SEND_TO_BACK) {
      return {
          ...state,
          card: [...sendToBack(action.index, state.card)],
          show: state.show
      };
  }

  if (action.type === FLIP_IMAGE) {
      return {
          ...state,
          card: [...flipImage(action.index, state.card)],
          show: state.show
      };
  }

  if (action.type === DUPLICATE_IMAGE) {
      return {
          ...state,
          card: [...duplicateImage(action.index, state.card)],
          show: state.show
      };
  }

  if (action.type === UPDATE_TEXT) {
      return {
          ...state,
          card: [...updateText(action.text,action.index, state.card)],
          show: state.show
      };
  }

  if (action.type === REMOVE_IMAGE) {
      return {
          ...state,
          card: [...removeImage(action.index, state.card)],
          show: state.show
      };
  }

  return state;
}
