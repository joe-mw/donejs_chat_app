import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './messages.less';
import view from './messages.stache';
import Message from '../models/message';

export const ViewModel = DefineMap.extend({

  // creating a new message
  name: 'string',
  body: 'string',

  // submit button to create a new message
  send(event){
    event.preventDefault();

    // use 'save' to create a post request to /api/messages with the payload
    new Message({
      name: this.name,
      body: this.body
    }).save().then((result) => {
      
      // empty the message textbox
      this.body = '';
    }).catch((err) => {
      throw new Error(err.message);
    });
  },

  get messagesPromise(){
    return Message.getList({});
  }
});

export default Component.extend({
  tag: 'chat-messages',
  ViewModel,
  view
});
