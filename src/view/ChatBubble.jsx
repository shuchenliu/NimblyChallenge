import React, { Component } from 'react';
import typingGif from './typing.gif';
import typingGif1 from './typing-1.gif';

import * as Queries from '../MetaWeatherAPI/queries.js';

import store from '../data-flow/Store.js';
import * as Actions from '../data-flow/Actions.js';

class ChatBubble extends Component {
  constructor() {
    super();
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather(e) {
    e.preventDefault();
    const identifier = e.target.id;
    const woeid = identifier.split(',')[0];
    const title = identifier.split(',')[1];
    store.dispatch(dispatch => {
      dispatch(Actions.addChat('query', title));
      dispatch(Actions.toggleFetchFlag());
      Queries.queryWeather(woeid)
                .then(data => {
                  const weather = data.consolidated_weather[0];
                  weather.place = title;
                  dispatch(Actions.addChat('weather', weather));
                  dispatch(Actions.toggleFetchFlag());
                })
                .catch(e => {
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
                });
    });
  }

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
        content = <span>I wanna know what's the weather like in <b>{this.props.content}</b>.</span>
        break;
      case 'weather':
        const weather = this.props.content;
        const imgUrl = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        content = (
          <div>
            <span>This is the weather report for <b>{weather.place}</b> on {weather.applicable_date}: </span>
            <ul className="list">
              <li>
                  {weather.weather_state_name}
                  <img className="WeatherIcon" src={imgUrl} alt={weather.weather_state_abbr} />
              </li>
              <li>
                  <span>Highest temp: {weather.max_temp.toFixed(2)}&#8451;</span>
              </li>
              <li>
                  <span>Lowest temp: {weather.min_temp.toFixed(2)}&#8451;</span>
              </li>
              <li>
                  <span>Humidity: {weather.humidity}%</span>
              </li>
              <li>
                  <span>Air pressure: {weather.air_pressure} mbar</span>
              </li>
            </ul>
          </div>
        );
        break;
      case 'selection':
        const contents = this.props.content.map((place, index) => {
          let linkContent = place.title;
          if (index < this.props.content.length - 1) {
            linkContent += ', ';
          }

          if (index === this.props.content.length - 2) {
            linkContent += 'or ';
          }
          return <a id={place.woeid + ',' + place.title} key={index} href="#" onClick={this.fetchWeather}>{linkContent}</a>;
        }
        );
        content = <div>
          Do you mean: {" "}
          {contents}
          ?
        </div>

        break;
      case 'NotFoundError':
        content = 'That can\' be a real place on earth... (MetaWeather API is not that good...)';
        break;
      case 'ServerError':
        content = 'The server just hang up on me. Rude!';
        break;
      case 'NetworkError':
        content = 'Embarrassing, check you network though.';
        break;
      case 'text':
        content = this.props.content;
        break;
      default:
        content = null;
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
