import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";


import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage
};
const reducer = combineReducers({
  cart: cartReducer,
    
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: persistedReducer,
  // reducer : {
  //   cart: cartReducer,
   
  // }
  
  
});

export default store;
