import React, { Component } from 'react';
import typingGif from './typing.gif';
import typingGif1 from './typing-1.gif';
class ChatBubble extends Component {
  render() {

    // Set up CSS based on type of chats
    const flexDirection = this.props.chatType === 'user' ? 'flex-right' : 'flex-left';
    const bubbleHolderClass = `ChatBubbleHolder ${flexDirection}`;
    const bubbleClasses = `ChatBubble ${this.props.chatType}`;

    let content;

    // if this is a typing placeholder
    if (this.props.isTyping) {
      const gifSelected = flexDirection === 'flex-right' ? typingGif : typingGif1;
      content = (<img src={gifSelected} alt="Typing..." height="30" />);
    }

    // otherwise this is a regular text input
    return (
      <div className={bubbleHolderClass}>
        <div className={bubbleClasses}>
          {content}
        </div>
      </div>
    );
  };
}

export default ChatBubble;
