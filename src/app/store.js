// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import TodosReducer from "../features/todos/todosSlice";
import { authApi } from "api/auth/authApi";
import { groupsApi } from "api/groups/groupsApi";

const store = configureStore({
  reducer: {
    todos: TodosReducer,
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, groupsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
