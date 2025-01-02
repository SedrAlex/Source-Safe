// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import TodosReducer from "../features/todos/todosSlice";
import { authApi } from "api/auth/authApi";
import { groupsApi } from "api/groups/groupsApi";
import { filesApi } from "api/files/filesApi";
import userReducer from "api/user/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
  reducer: {
    todos: TodosReducer,
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    user: persistedReducer, 

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, groupsApi.middleware,filesApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export default store;
