import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import store from '../data-flow/Store.js';
import * as Actions from '../data-flow/Actions.js';

import * as Queries from '../MetaWeatherAPI/queries.js';

// The Search Bar component
class Search extends Component {
  constructor() {
    super();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    this.updateTypingTimer = this.updateTypingTimer.bind(this);
    this.setTypingTimer = this.setTypingTimer.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {...(this.getOwnState()), textValue: 'So'};
  }

  getOwnState() {
      return {
        typingTimerID: store.getState().typingTimerID,
        isFetchingData: store.getState().isFetchingData,
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
    },700);

    if (this.state.typingTimerID !== -1) {
      clearTimeout(this.state.typingTimerID);
    }

    this.updateTypingTimer(newTypingTimer);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleButtonClick();
    }
  }
  handleButtonClick() {
      if (this.state.isFetchingData || this.state.textValue.length === 0) {
        return;
      }

      // issue queries to API and other state change requests
      store.dispatch(dispatch => {
        dispatch(Actions.addChat('query', this.state.textValue));
        dispatch(Actions.toggleFetchFlag());


        Queries.queryPlace(this.state.textValue)
              .then(data => {
                if (data.length === 0) {
                  // No place named like this
                  throw new Error('No place found');
                } else if (data.length === 1) {
                  // Exactly 1 place found
                  const place = data[0];
                  return Queries.queryWeather(place.woeid)
                            .then(data => {
                              const weather = data.consolidated_weather[0];
                              weather.place = place.title;
                              dispatch(Actions.addChat('weather', weather));
                              dispatch(Actions.toggleFetchFlag());
                            })
                            .catch(e => {
                              throw e;
                            });
                } else {
                  // Multiple places found
                  let candidates = data.slice(0, 5);
                  dispatch(Actions.addChat('selection', candidates));
                  dispatch(Actions.toggleFetchFlag());
                }
              })
              .catch(e => {
                // Error handling
                switch(e.message) {
                  case 'No place found':
                    dispatch(Actions.addChat('NotFoundError'));
                    break;
                  case 'Server Error':
                    dispatch(Actions.addChat('ServerError'));
                    break;
                  case 'Network Connection Error':
                    dispatch(Actions.addChat('NetworkError'));
                    break;
                  default:
                    break;
                }
                dispatch(Actions.toggleFetchFlag());
              })
      });

  }

  render() {
    const buttonStyle = {
      color: 'white',
      marginLeft: '10px',
      width: '10px',
      background: this.state.isFetchingData || this.state.textValue.length === 0 ? 'grey' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    };

    return (
      <span className="Lora search">
        <span className="fixedText">I wanna know the weather of</span>
        <TextField
          id="SearchBar"
          className="TextField Lora"
          disabled={this.state.isFetchingData}
          onChange={this.handleTextChange}
          inputStyle={{ textAlign: 'center',
                        fontFamily: 'Lora',
                        fontSize:20,
                        fontWeight: 'Bold'}}
          hintStyle={{width: '130px', textAlign: 'center' }}
          style={{ width: '130px' }}
          defaultValue={this.state.textValue}
          onKeyPress={this.handleKeyPress}/>
        ,
        <FlatButton
          label="GO!"
          labelStyle={{ fontSize: 20, fontFamily: 'Pacifico'}}
          disabled={this.state.textValue.length === 0}
          style={buttonStyle}
          onClick={this.handleButtonClick}
          />
      </span>
    );
  }
}


export default Search;
