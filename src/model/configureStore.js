import {saveState} from "./localStorage";
import throttle from "lodash/throttle";
import {createStore} from "redux";
import todoApp from "../reducers";

const addLoggingToStore = store => {

    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);

        console.log("%c prev state", 'color: gray', store.getState());
        console.log("%c action", 'color: blue', action);
        const result = rawDispatch(action);
        console.log("%c next state", 'color: green', store.getState());
        console.groupEnd(action.type);

        return result;
    };
};

const configureStore = () => {
    const loadedState = undefined;

    // Store mit Support für Chrome Dev Tools
    const store = createStore(todoApp, loadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.dispatch = addLoggingToStore(store);

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};

export default configureStore;
