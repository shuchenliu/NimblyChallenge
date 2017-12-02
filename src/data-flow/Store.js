import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
  typingTimerID: -1,
};

const store = createStore(reducer, initValues);

export default store;
