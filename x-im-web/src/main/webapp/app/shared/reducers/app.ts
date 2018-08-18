import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  NEW_CHAT_TOOGLE: 'app/NEW_CHAT_TOOGLE',
  NEW_CHAT_TOOGLE_CLOSE: 'app/NEW_CHAT_TOOGLE_CLOSE'
};

const initialState = {
  isNewChatShow: false //  是否显示新建群窗口
};

export type AppState = Readonly<typeof initialState>;

// Reducer

export default (state: AppState = initialState, action): AppState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.NEW_CHAT_TOOGLE):
      return {
        ...state,
        isNewChatShow: action.isNewChatShow
      };
    default:
      return state;
  }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const newChatToogle = (isNewChatShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.NEW_CHAT_TOOGLE,
    payload: { isNewChatShow }
  });
