import {Middleware} from '@reduxjs/toolkit';
import Logger from '../shared/Logger';

const loggerMiddleware: Middleware = store => next => action => {
  console.group(action.type);
  Logger.info('Dispatching:', action);
  let result = next(action);
  Logger.info('Next state:', store.getState());
  console.groupEnd();
  return result;
};
export default loggerMiddleware;
