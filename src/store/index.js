import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';


const rootReducer = combineReducers({
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

