import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/auth';
import postsReducer from './slices/posts';

const persistAuthConfig = {
  key: 'auth',
  storage
};

const persistedReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: persistedReducer
  },
  middleware: defaultMiddleware => defaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    }
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type UseAppDispatch = ThunkDispatch<RootState, null, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export const persistor = persistStore(store);

export const useAppDispatch = (): UseAppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
