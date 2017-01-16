import uuid from "uuid";
import * as api from "../api";
import {getIsFetching} from "../reducers";

export const actionAddTodo = (text) => ({
    type: ':ADD_TODO',
    id: uuid(),
    text
});


export const actionToggleTodo = (id) => ({
    type: ':TOGGLE_TODO',
    id
});

export const actionDeleteTodo = (id) => ({
    type: ':DELETE_TODO',
    id
});

export const actionFetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }

    dispatch({
        type: ':FETCH_TODOS_REQUEST',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: ':FETCH_TODOS_SUCCESS',
                filter,
                todos: response
            });
        },
        error => {
            dispatch({
                type: ':FETCH_TODOS_FAILURE',
                filter,
                message: error.message || 'Something went wrong!'
            });
        }
    );
};


