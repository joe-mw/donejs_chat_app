import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './messages.less';
import view from './messages.stache';

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the chat-messages component'
  }
});

export default Component.extend({
  tag: 'chat-messages',
  ViewModel,
  view
});
