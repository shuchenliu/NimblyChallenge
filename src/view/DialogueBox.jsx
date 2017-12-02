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
    const userTypingBubble = this.state.typingTimerID === -1
      ? null
      : <ChatBubble chatType="user" typingHolder={true} />;

    return (
      <Paper className="DialogueBox">


        {/* Typing placeholders.
            Will always be there,
            visibility depending on state of the search bar*/}
        {userTypingBubble}
        <ChatBubble chatType="bot" typingHolder={true} />
      </Paper>
    );
  };
}

export default DialogueBox;
