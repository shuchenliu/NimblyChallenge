import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ChatBubble from './ChatBubble';

import store from '../data-flow/Store.js';


class DialogueBox extends Component {
  constructor() {
    super();

    this.getOwnState = this.getOwnState.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    return {
      typingTimerID: store.getState().typingTimerID,
      isFetchingData: store.getState().isFetchingData,
      chats: store.getState().chats,
    };
  }

  onChange() {
    this.setState(this.getOwnState(), () => {
      const containter = document.getElementById("dialogueBox");
      containter.scrollTop = containter.scrollHeight;
    });
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    // Hide user typing bubble if TypingTimerID is -1
    const defaultQuestion = 'Hi, I am the WeatherBot. What can I do for you today?';
    const defaultQuestionBubble = <ChatBubble userType="bot" chatType="text" content={defaultQuestion} />;

    const userTypingBubble = this.state.typingTimerID === -1
      ? null
      : <ChatBubble userType="user" chatType="typingHolder" />;

    const botTypingBubble = !this.state.isFetchingData
        ? null
        : <ChatBubble userType="bot" chatType="typingHolder" />;


    const bubbles = this.state.chats.map((item, index) => {
      let userType;
      if (item.chatType === 'query') {
        userType='user';
      } else {
        userType = 'bot';
      }
      return <ChatBubble key={index} userType={userType} chatType={item.chatType} content={item.content}/>
    });

    return (
      <Paper id="dialogueBox" className="DialogueBox">
        {defaultQuestionBubble}
        {bubbles}
        {userTypingBubble}
        {botTypingBubble}
      </Paper>
    );
  };
}

export default DialogueBox;
