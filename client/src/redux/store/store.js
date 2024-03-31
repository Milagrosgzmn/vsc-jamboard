import {configureStore} from '@reduxjs/toolkit';

import { persistStore, persistReducer, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from '../slices/userSlice';
import jamboard from '../slices/jamboardSlice';


const userPersistConfig = {
    key: 'user',
    storage,
    whitelist:['id', 'username','email']
  };
  const persistedUserReducer = persistReducer(userPersistConfig, user);

  const boardPersistConfig = {
    key: 'jamboard',
    storage,
    whitelist:['boards']
  };
  const persistedBoardsReducer = persistReducer(boardPersistConfig, jamboard);

export const store = configureStore({
    reducer:{
        user: persistedUserReducer,
        jamboard: persistedBoardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [ REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);
