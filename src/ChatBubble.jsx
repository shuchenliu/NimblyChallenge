import React, { Component } from 'react';

class ChatBubble extends Component {
  render() {
    // Set up CSS based on type of chats
    const flexDirection = this.props.chatType === 'user' ? 'flex-right' : 'flex-left';
    const bubbleHolderClass = `ChatBubbleHolder ${flexDirection}`;
    const bubbleClasses = `ChatBubble ${this.props.chatType}`;

    return (
      <div className={bubbleHolderClass}>
        <div className={bubbleClasses}>
          Hi, I would like to know the weather for Wuhan!
        </div>
      </div>
    );
  };
}

export default ChatBubble;
