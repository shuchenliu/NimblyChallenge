import React, { Component } from 'react';
import typingGif from './typing.gif';
import typingGif1 from './typing-1.gif';
class ChatBubble extends Component {
  render() {

    // Set up CSS based on type of chats
    const flexDirection = this.props.userType === 'user' ? 'flex-right' : 'flex-left';
    const bubbleHolderClass = `ChatBubbleHolder ${flexDirection}`;
    const bubbleClasses = `ChatBubble ${this.props.userType}`;

    let content;


    switch (this.props.chatType) {
      case 'typingHolder':
        const gifSelected = flexDirection === 'flex-right' ? typingGif : typingGif1;
        content = (<img src={gifSelected} alt="Typing..." height="30" />);
        break;
      case 'query':
        content = <span>I wanna know the weather for <b>{this.props.content}</b> tomorrow.</span>
        break;
      default:
        content = this.props.content;
        break;
    }


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
