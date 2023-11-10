import {
  ConfigureStoreOptions,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import autReducer from '@/redux/features/auth/auth-slice';
import { api } from '@/services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: autReducer,
});

// configure redux-persist to store the redux state in the browser's local storage
// TODO: change to persist in cookies
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
