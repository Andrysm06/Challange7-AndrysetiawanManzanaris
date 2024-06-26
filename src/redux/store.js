import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import reducer from "./reducers/homePageReducers";

const rootReducers = combineReducers({
  movie: reducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movie"],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
export const persistor = persistStore(store);
