import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICustomerRelation, defaultValue } from 'app/shared/model/customer-relation.model';
import { ACTION_TYPES as CUSTOMER_RELATION_ACTION_TYPES, updateEntity, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import { ACTION_TYPES as FLOCK_RELATION_ACTION_TYPES, updateEntity as updateFlockRelationState, FlockRelationState } from 'app/shared/reducers/flock-relation.reducer';

export const ACTION_TYPES = {
  NEW_CHAT_TOOGLE: 'app/NEW_CHAT_TOOGLE',
  MEMBERS_TOOGLE: 'app/MEMBERS_TOOGLE',
  ADD_MEMBERS_TOOGLE: 'app/ADD_MEMBERS_TOOGLE',
  USERINFO_TOOGLE: 'app/USERINFO_TOOGLE',
  BATCHSEND_TOOGLE: 'app/USERINFO_TOOGLE',
  FORWARD_TOOGLE: 'app/FORWARD_TOOGLE',
  SEARCH_TOOGLE: 'app/SEARCH_TOOGLE'
};
/**
 * 本项目视图数据状态和业务数据状态分开
 * app.ts只存储公共视图组件的状态，独立的视图组件存储在其自身state里面
 * 业务数据存储在对应数据领域的reducer里面
 */
const initialState = {
  isNewChatShow: false, //  是否显示新建群窗口
  isMembersShow: false, //  是否显示
  isAddMembersShow: false, //  是否显示
  isUserInfoShow: false, //  是否显示, //  是否显示
  isUserInfoDelete: false, //  用户是否能能删除
  isBatchsendShow: false,  //  用户是否能能删除
  isForwardShow: false,
  isSearchShow: false
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
    case ACTION_TYPES.NEW_CHAT_TOOGLE:
      return {
        ...state,
        isNewChatShow: action.payload.isNewChatShow
      };
    case ACTION_TYPES.MEMBERS_TOOGLE:
      return {
        ...state,
        isMembersShow: action.payload.isMembersShow
      };
    case ACTION_TYPES.ADD_MEMBERS_TOOGLE:
      return {
        ...state,
        isAddMembersShow: action.payload.isAddMembersShow
      };
    case ACTION_TYPES.USERINFO_TOOGLE:
      return {
        ...state,
        isUserInfoShow: action.payload.isUserInfoShow,
        isUserInfoDelete: action.payload.isUserInfoDelete
      };
    case ACTION_TYPES.BATCHSEND_TOOGLE:
      return {
        ...state,
        isBatchsendShow: action.payload.isBatchsendShow
      };
    case ACTION_TYPES.FORWARD_TOOGLE:
      return {
        ...state,
        isForwardShow: action.payload.isForwardShow
      };
    case ACTION_TYPES.SEARCH_TOOGLE:
      return {
        ...state,
        isForwardShow: action.payload.isSearchShow
      };
    default:
      return state;
  }
};

export const newChatToogle = (isNewChatShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.NEW_CHAT_TOOGLE,
    payload: { isNewChatShow }
  });

export const memberToogle = (isMembersShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.MEMBERS_TOOGLE,
    payload: { isMembersShow }
  });

export const addMemberToogle = (isAddMembersShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_MEMBERS_TOOGLE,
    payload: { isAddMembersShow }
  });

/**
 * 显示用户信息框，设置用户详情数据
 * @param isUserInfoShow
 * @param iCustomerRelation
 * @param isUserInfoDelete
 */
export const userInfoToogle = (isUserInfoShow: boolean, iCustomerRelation, isUserInfoDelete = false) => dispatch => {
  dispatch({
    type: CUSTOMER_RELATION_ACTION_TYPES.UPDATE_CUSTOMERRELATION,
    payload: { data: iCustomerRelation }
  });
  dispatch({
    type: ACTION_TYPES.USERINFO_TOOGLE,
    payload: { isUserInfoShow }
  });
};

export const batchSendToogle = (isBatchsendShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_MEMBERS_TOOGLE,
    payload: { isBatchsendShow }
  });

  export const forwardToogle = (isForwardShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_MEMBERS_TOOGLE,
    payload: { isForwardShow }
  });

export const searchToogle = (isSearchShow: boolean) => dispatch =>
  dispatch({
    type: ACTION_TYPES.ADD_MEMBERS_TOOGLE,
    payload: { isSearchShow }
  });
