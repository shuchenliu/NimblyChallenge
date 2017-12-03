import * as ActionTypes from './ActionTypes.js';

export const setTyping = typingTimerID => {
  return {
    type: ActionTypes.SET_TYPING,
    typingTimerID: typingTimerID,
  };
};

export const toggleFetchFlag = () => {
  return {
    type: ActionTypes.TOGGLE_FETCH_FLAG,
  };
};


export const addChat = (chatType, content) => {
  return {
    type: ActionTypes.ADD_CHAT,
    payload: {
      chatType: chatType,
      content: content,
    },
  };
};
