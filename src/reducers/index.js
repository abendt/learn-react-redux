import {combineReducers} from "redux";
import todos, * as fromTodos from "./todos";

const message = (state = {text: '', id: 0}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                text: 'created todo',
                id: Math.random()
            };

        case 'RESET_NOTIFICATION':
            // fallthrough
        default:
            return {
                ...state,
                text: '',
            };
    }
};

const todoApp = combineReducers({
    todos,
    message
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
    fromTodos.getVisibleTodos(state.todos, filter);
