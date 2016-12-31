import {loadState, saveState} from './localStorage';
import throttle from "lodash/throttle";
import {createStore} from "redux";
import todoApp from "../reducers";

const configureStore = () => {
    const loadedState = undefined;
    //loadState();

    // Store mit Support für Chrome Dev Tools
    const store = createStore(todoApp, loadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};

export default configureStore;
