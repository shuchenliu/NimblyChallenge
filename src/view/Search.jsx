import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import store from '../data-flow/Store.js';
import * as Actions from '../data-flow/Actions.js';

// The Search Bar component
class Search extends Component {
  constructor() {
    super();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    this.updateTypingTimer = this.updateTypingTimer.bind(this);
    this.setTypingTimer = this.setTypingTimer.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {...(this.getOwnState()), textValue: 'Wuhan'};
  }

  getOwnState() {
      return {
        typingTimerID: store.getState().typingTimerID,
      }
  }

  updateTypingTimer(timer) {
    store.dispatch(Actions.setTyping(timer));
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

  handleTextChange() {
      // 1. Update typing timer:
      this.setTypingTimer();
      // 2. Update input value for further data fetching
  }

  setTypingTimer() {
    // TypingTimerID will be set to -1
    // if no key was pressed within last second
    const newTypingTimer = setTimeout(() => {
      this.updateTypingTimer(-1);
    },1500);

    if (this.state.typingTimerID !== -1) {
      clearTimeout(this.state.typingTimerID);
    }

    this.updateTypingTimer(newTypingTimer);
  }

  handleButtonClick() {
    // Dispatch 2 sets of data:
    // 1. State's value,
    // 2. Get Avatar

  }

  render() {
    return (
      <span className="Lora"> I wanna know the weather of
        <TextField
          id="SearchBar"
          className="TextField Lora"
          onChange={this.handleTextChange}
          inputStyle={{ textAlign: 'center',
                        fontFamily: 'Lora',
                        fontSize:20,
                        fontWeight: 'Bold'}}
          hintStyle={{ width: '120px', textAlign: 'center' }}
          style={{ width: '120px' }}
          defaultValue={this.state.textValue}/>
        ,
        <FlatButton
          className="SearchButton"
          label="GO!"
          labelStyle={{ fontSize: 20, fontFamily: 'Lora'}}
          />
      </span>
    );
  }
}


export default Search;
