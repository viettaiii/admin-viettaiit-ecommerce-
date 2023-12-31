import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sideBarSlice from "./features/sideBarSlice";
import storage from "redux-persist/lib/storage";
import categorySlice from "./features/category/categorySlice";
import providerSlice from "./features/provider/providerSlice";
import colorSlice from "./features/color/colorSlice";
import productSlice from "./features/product/productSlice";
import spinnerSlice from "./features/spinnerSlice";
import userSlice from "./features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  sideBar: sideBarSlice,
  category: categorySlice,
  provider: providerSlice,
  color: colorSlice,
  product: productSlice,
  user: userSlice,
  spinner: spinnerSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
