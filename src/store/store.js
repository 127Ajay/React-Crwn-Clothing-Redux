import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
} from "redux";
import logger from "redux-logger";

import { RootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(RootReducer, undefined, composedEnhancers);
