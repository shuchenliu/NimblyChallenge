import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import ChatBubble from './ChatBubble';

class DialogueBox extends Component {
  render() {
    return (
      <Paper className="DialogueBox">
        <ChatBubble chatType="user"/>
        <ChatBubble chatType="bot"/>
      </Paper>
    );
  };
}

export default DialogueBox;
