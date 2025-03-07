import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";

const cartPersistConfig = {
  key: "cart",
  storage,
  version: 1,
};

const userPersistConfig = {
  key: "user",
  storage,
  version: 1,
};


const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
