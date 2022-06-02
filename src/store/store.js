import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
} from "redux";
import { RootReducer } from "./root-reducer";

import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
    Boolean
);
const composeEnhancers =
    (process.env.NODE_ENV !== "production" &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

export const persistor = persistStore(store);
