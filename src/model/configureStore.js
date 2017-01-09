import {createStore} from "redux";
import todoApp from "../reducers";

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

const promises = (store) => (dispatch) => {

    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(dispatch);
        }

        return dispatch(action);
    };
};

const wrapDispatchWithMiddleware = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    )
};

const configureStore = () => {
    const loadedState = undefined;

    // Store mit Support für Chrome Dev Tools
    const store = createStore(todoApp, loadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    const middlewares = [promises];

    wrapDispatchWithMiddleware(store, middlewares);

    // store.subscribe(throttle(() => {
    //     saveState({
    //         todos: store.getState().todos
    //     });
    // }, 1000));

    return store;
};

export default configureStore;
