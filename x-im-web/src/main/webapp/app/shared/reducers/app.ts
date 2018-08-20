import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  NEW_CHAT_TOOGLE: 'app/NEW_CHAT_TOOGLE',
  NEW_CHAT_TOOGLE_CLOSE: 'app/NEW_CHAT_TOOGLE_CLOSE',
  MEMBERS_TOOGLE: 'app/MEMBERS_TOOGLE'
};

const initialState = {
  isNewChatShow: false, //  是否显示新建群窗口
  isMembersShow: false
};

export type AppState = Readonly<typeof initialState>;

/**
 * 首页视图Reducer
 * state：为当前状态
 * action:为你要修改的信息类型及其值
 * 永远不要在 reducer 里做这些操作：
 * 修改传入参数；
 * 执行有副作用的操作，如 API 请求和路由跳转；
 * 调用非纯函数，如 Date.now() 或 Math.random()
 */
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
  export const newMemberToogle = (isMembersShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.MEMBERS_TOOGLE,
    payload: { isMembersShow }
  });
