import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from 'app/shared/reducers';
import DevTools from 'app/config/devtools';
import errorMiddleware from 'app/config/error-middleware';
import notificationMiddleware from 'app/config/notification-middleware';
import loggerMiddleware from 'app/config/logger-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

const defaultMiddlewares = [
  thunkMiddleware,
  errorMiddleware,
  notificationMiddleware,
  promiseMiddleware(),
  loadingBarMiddleware(),
  loggerMiddleware
];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares),
        DevTools.instrument()
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));
// 创建 Redux store 来存放应用的状态。
const initialize
  = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));
// eg:
// 可以手动订阅更新，也可以事件绑定到视图层。
// store.subscribe(() =>
//   console.log(store.getState())
// );
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// store.dispatch({ type: 'INCREMENT' });

/**
 * 公共store
 * 通过触发action调用store改变 state 树
 */
export default initialize;
