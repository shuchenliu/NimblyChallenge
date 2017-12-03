import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ChatBubble from './ChatBubble';

import store from '../data-flow/Store.js';
import * as Actions from '../data-flow/Actions.js';

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
    this.setState(this.getOwnState());
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
    const defaultQuestionBubble = <ChatBubble userType="bot" content={defaultQuestion} />;

  const userTypingBubble = this.state.typingTimerID === -1
      ? null
      : <ChatBubble userType="user" chatType="typingHolder" />;

    const botTypingBubble = !this.state.isFetchingData
        ? null
        : <ChatBubble userType="bot" chatType="typingHolder" />;


      const bubbles = this.state.chats.map((item, index) => {
        return <ChatBubble key={index} userType="user" chatType={item.chatType} content={item.content}/>
      });

    return (
      <Paper className="DialogueBox">
        {defaultQuestionBubble}
        {bubbles}

        {/* Typing placeholders.
            Will always be there,
            visibility depending on state of the search bar*/}
        {userTypingBubble}
        {botTypingBubble}
      </Paper>
    );
  };
}

export default DialogueBox;
