import uuid from "uuid";
import * as api from "../api";

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

export const actionRequestTodos = (filter) => ({
    type: ':REQUEST_TODOS',
    filter
});

const actionReceiveTodos = (filter, todos) => ({
    type: ':RECEIVE_TODOS',
    filter,
    todos
});

export const actionFetchTodos = (filter) => (dispatch) => {
    dispatch(actionRequestTodos(filter));

    return api.fetchTodos(filter).then(response =>
        dispatch(actionReceiveTodos(filter, response))
    );
};


