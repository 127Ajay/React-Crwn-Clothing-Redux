import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
} from "redux";
import { RootReducer } from "./root-reducer";
import createSagaMiddleWare from "redux-saga";
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { rootSaga } from "./root-saga";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const sagaMiddleWare = createSagaMiddleWare();

const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleWare,
].filter(Boolean);

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

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
