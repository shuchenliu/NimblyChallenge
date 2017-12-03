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
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.toggleFetchFlag = this.toggleFetchFlag.bind(this);
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

  handleTextChange(e) {
      // 1. Update typing timer:
      this.setTypingTimer();
      // 2. Update input value for further data fetching
      this.setState({
        textValue: e.target.value,
      });
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
      // issue queries to API and other state change requests
      store.dispatch(Actions.addChat('query', this.state.textValue));
      store.dispatch(Actions.toggleFetchFlag());
  }

  toggleFetchFlag() {
      store.dispatch(Actions.toggleFetchFlag());
  }

  render() {
    const buttonStyle = {
      color: 'white',
      marginLeft: '10px',
      width: '10px',
      background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    };


    return (
      <span className="Lora search"> I wanna know the weather of
        <TextField
          id="SearchBar"
          className="TextField Lora"
          onChange={this.handleTextChange}
          inputStyle={{ textAlign: 'center',
                        fontFamily: 'Lora',
                        fontSize:20,
                        fontWeight: 'Bold'}}
          hintStyle={{width: '120px', textAlign: 'center' }}
          style={{ width: '120px' }}
          defaultValue={this.state.textValue}/>
        ,
        <FlatButton
          label="GO!"
          labelStyle={{ fontSize: 20, fontFamily: 'Pacifico'}}
          style={buttonStyle}
          onClick={this.handleButtonClick}
          />
      </span>
    );
  }
}


export default Search;
