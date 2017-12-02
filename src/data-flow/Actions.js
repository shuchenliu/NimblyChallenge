import * as ActionTypes from './ActionTypes.js';

export const setTyping = typingTimerID => {
  return {
    type: ActionTypes.SET_TYPING,
    typingTimerID: typingTimerID,
  };
};
