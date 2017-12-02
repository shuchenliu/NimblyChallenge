import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TYPING:
      const {typingTimerID} = action;

      return {...state, typingTimerID: typingTimerID};
    default:
      return state;
  }
}
