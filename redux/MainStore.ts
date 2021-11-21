import {AnyAction, configureStore, Reducer} from '@reduxjs/toolkit';
import {persistStore, persistReducer, Storage} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer, {RootState} from './RootReducer';
import {MMKV} from 'react-native-mmkv';
import {getFirebase} from 'react-redux-firebase';

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

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer as Reducer<RootState, AnyAction>,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {extraArgument: getFirebase},
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
