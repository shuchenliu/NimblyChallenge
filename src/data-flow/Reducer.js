import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TYPING:
      const {typingTimerID} = action;
      return {...state, typingTimerID: typingTimerID};

    case ActionTypes.TOGGLE_FETCH_FLAG:
      return {...state, isFetchingData: !(state.isFetchingData)};

    case ActionTypes.ADD_CHAT:
      const {payload} = action;
      return {...state, chats: [...state.chats, payload]};

    default:
      return state;
  }
}
