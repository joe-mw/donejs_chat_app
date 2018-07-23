import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import superMap from 'can-connect/can/super-map/';
import loader from '@loader';
import io from 'steal-socket.io';

const Message = DefineMap.extend({
  seal: false
}, {
  'id': 'any',
  name: 'string',
  body: 'string'
});

Message.List = DefineList.extend({
  '#': Message
});

const algebra = new set.Algebra(
  set.props.id('id')
);

Message.connection = superMap({
  url: loader.serviceBaseURL + '/api/messages',
  Map: Message,
  List: Message.List,
  name: 'message',
  algebra
});

const socket = io(loader.serviceBaseURL);

// tell the realtime system that a message has been created
socket.on('messages created', (message) => {Message.connection.createInstance(message)});
// tell the realtime system that a message has changed
socket.on('messages updated', (message) => {Message.connection.updateInstance(message)});
// tell the realtime system that a message has been deleted
socket.on('messages removed', (message) => {Message.connection.destroyInstance(message)});


export default Message;
