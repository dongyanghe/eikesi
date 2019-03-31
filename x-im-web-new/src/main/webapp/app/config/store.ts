import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from 'app/shared/reducers';
import DevTools from './devtools';
import errorMiddleware from './error-middleware';
import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';
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
const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));
// 扩展示例:
// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
// 可以手动订阅更新，也可以事件绑定到视图层。
// const unsubscribe = initialize().subscribe(() =>
//   console.log(initialize().getState())
// );
// 停止监听 state 更新
// unsubscribe();
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// initialize().dispatch({ type: 'INCREMENT' });
export default initialize;
