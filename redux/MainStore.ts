import {configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {getFirebase} from 'react-redux-firebase';
import {persistReducer, persistStore, Storage} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer, {RootState} from './RootReducer';
import loggerMiddleware from './loggerMiddleware';

export const storage = new MMKV();

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['currentUser'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {extraArgument: getFirebase},
      immutableCheck: false,
      serializableCheck: false,
    }).concat(loggerMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
