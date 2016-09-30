
'use strict';

import type {Action} from '../actions/types';
import {MOVE_CARD, ADD_CARD, MAKE_ACTIVE, BRING_TO_TOP, SEND_TO_BACK, FLIP_IMAGE, DUPLICATE_IMAGE, REMOVE_IMAGE, SHOW_ALL} from '../actions/card';

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
    url: 'http://babylon.geekydev.com/images/185250876.png',
    height: 400,
    width: 162
  },
  {
    url: 'http://babylon.geekydev.com/images/177082432.png',
    height: 400,
    width: 149
  },
  {
    url: 'http://babylon.geekydev.com/images/182139204.png',
    height: 400,
    width: 349
  },
  {
    url: 'http://babylon.geekydev.com/images/183369275.png',
    height: 400,
    width: 124
  },
  {
    url: 'http://babylon.geekydev.com/images/185415448.png',
    height: 400,
    width: 266
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
    show: boolean
}

const initialState = {
    card: [],
    show: false
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function edit(index, arr, payload) {
    var newArr = [];
    arr.map(function(elem,i)  {
        var obj = elem;
        if (index === i) {
            obj.top = payload.y;
            obj.left = payload.x;
            obj.height = payload.height;
            obj.width = payload.width;
            obj.rotate = payload.rotate;
            obj.rotateNow = payload.rotateNow;
            obj.rotateBefore = payload.rotateBefore;
            obj.scaleX = elem.scaleX;
            obj.scaleY = elem.scaleY;
            obj.active = elem.active;
            obj.url = elem.url;
        }
        newArr.push(obj);
    });

    return newArr;
}

function active(index, arr) {
    var newArr = [];
    arr.map(function(elem,i)  {
        var obj = elem;
        if (index === i) {
            obj.active = 1;
        } else {
            obj.active = 0;
        }
        newArr.push(obj);
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
        console.log(obj.rotateBefore);
        if (index === i) {
          if ((obj.rotateBefore % 360 < -45 && obj.rotateBefore % 360 > -135) ||
              (obj.rotateBefore % 360 > 45 && obj.rotateBefore % 360 < 136) ||
              (obj.rotateBefore % 360 > 225 && obj.rotateBefore % 360 < 315) ||
              (obj.rotateBefore % 360 < -315 && obj.rotateBefore % 360 > 45)) {
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
        newItem.rotateBefore = item.rotateBefore;
        newItem.scaleX = item.scaleX;
        newItem.scaleY = item.scaleY;
        newItem.active = 1;
        newItem.url = item.url;
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

    if (action.type === MOVE_CARD) {
        return {
            ...state, card: [...edit(action.index, state.card, action.payload)],  show: false
        };
    }

    if (action.type === ADD_CARD) {

        let image = images[getRandomInt(0, images.length - 1)];
         return {
             ...state,
             card: [...state.card, {
                 top: 100,
                 left: 10,
                 height: image.height / 2,//getRandomInt(100, 200),
                 width: image.width / 2,//getRandomInt(100, 200),
                 rotate: 0,
                 active: 0,
                 rotateBefore: 0,
                 rotateNow: 0,
                 scaleX: 1,
                 scaleY: 1,
                 url: image.url//'../../../images/logo.png'
             }],
             show: false
         };


    }

    if (action.type === MAKE_ACTIVE) {
        return {
            ...state,
            card: [...active(action.index, state.card)],
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
    if (action.type === REMOVE_IMAGE) {
        return {
            ...state,
            card: [...removeImage(action.index, state.card)],
            show: state.show
        };
    }

    if (action.type === SHOW_ALL) {
        return {
            ...state,
            card: [...showAll(state.card)],
            show: true
        };
    }


    return state;
}
