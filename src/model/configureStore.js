import {createStore, applyMiddleware, compose} from "redux";
import todoApp from "../reducers";
import createLogger from "redux-logger";
import thunk from "redux-thunk";

const configureStore = () => {
    const loadedState = undefined;

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [thunk, createLogger()];

    // Store mit Support für Chrome Dev Tools
    const store = createStore(todoApp, loadedState, composeEnhancers(applyMiddleware(...middlewares)));

    return store;
};

export default configureStore;
