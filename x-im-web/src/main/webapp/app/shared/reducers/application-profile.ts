import axios from 'axios';

import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  GET_PROFILE: 'applicationProfile/GET_PROFILE'
};

const initialState = {
  ribbonEnv: '',
  inProduction: true,
  isSwaggerEnabled: false
};

export type ApplicationProfileState = Readonly<typeof initialState>;
/**
 * 保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
 * 修改传入参数；
 * 执行有副作用的操作，如 API 请求和路由跳转；
 * 调用非纯函数，如 Date.now() 或 Math.random()。
 */
export default (state: ApplicationProfileState = initialState, action): ApplicationProfileState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_PROFILE):
      const { data } = action.payload;
      return {
        ...state,
        ribbonEnv: data['display-ribbon-on-profiles'],
        inProduction: data.activeProfiles.includes('prod'),
        isSwaggerEnabled: data.activeProfiles.includes('swagger')
      };
    default:
      return state;
  }
};
/**
 * Action 创建函数
 * 生成 action的一个方法
 * 一般用来封装复杂的数据或后台返回的数据
 */
export const getProfile = () => ({
  type: ACTION_TYPES.GET_PROFILE,
  payload: axios.get('management/info')
});
