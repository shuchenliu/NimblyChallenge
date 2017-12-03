import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './Reducer.js';

const initValues = {
  typingTimerID: -1,
  isFetchingData: false,
  chats: [],
};

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, initValues, middleware);

export default store;
