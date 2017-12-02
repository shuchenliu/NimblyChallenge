import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import ChatBubble from './ChatBubble';

class DialogueBox extends Component {
  render() {
    return (
      <Paper className="DialogueBox">


        {/* Typing placeholders.
            Will always be there,
            visibility depending on state of the search bar*/}
        <ChatBubble chatType="user" isTyping={true}/>
        <ChatBubble chatType="bot" isTyping={true}/>
      </Paper>
    );
  };
}

export default DialogueBox;
