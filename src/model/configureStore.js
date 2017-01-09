import {createStore, applyMiddleware, compose} from "redux";
import todoApp from "../reducers";
import promise from "redux-promise";
import createLogger from "redux-logger";

const logging = (store) => (dispatch) => {

    if (!console.group) {
        return dispatch;
    }

    return (action) => {
        console.group(action.type);

        console.log("%c prev state", 'color: gray', store.getState());
        console.log("%c action", 'color: blue', action);
        const result = dispatch(action);
        console.log("%c next state", 'color: green', store.getState());
        console.groupEnd(action.type);

        return result;
    };
};

const configureStore = () => {
    const loadedState = undefined;

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middlewares = [promise, logging];

    // Store mit Support für Chrome Dev Tools
    const store = createStore(todoApp, loadedState, composeEnhancers(applyMiddleware(...middlewares)));

    return store;
};

export default configureStore;
