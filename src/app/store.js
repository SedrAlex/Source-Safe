// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import TodosReducer from "../features/todos/todosSlice";
import { authApi } from "api/auth/authApi";
import { groupsApi } from "api/groups/groupsApi";
import { filesApi } from "api/files/filesApi";

const store = configureStore({
  reducer: {
    todos: TodosReducer,
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, groupsApi.middleware,filesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
