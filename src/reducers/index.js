import {combineReducers} from "redux";
import todos, * as fromTodos from "./todos";

const message = (state = {text: '', id: 0}, action) => {
    switch (action.type) {
        case ':ADD_TODO':
            return {
                text: 'created todo',
                id: Math.random()
            };

        case ':DELETE_TODO':
            return {
                text: 'deleted todo',
                id: Math.random()
            };

        case ':FETCH_TODOS_FAILURE':
            return {
                text: 'Fetch failed',
                id: Math.random(),
                type: 'warning'
            };

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
    fromTodos.getVisibleTodos(state.todos.present, filter);

export const getIsFetching = (state, filter) =>
    fromTodos.getIsFetching(state.todos.present, filter);

export const getErrorMessage = (state, filter) =>
    fromTodos.getErrorMessage(state.todos.present, filter);