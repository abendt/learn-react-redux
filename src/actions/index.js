import uuid from "uuid";
import {fetchTodos} from "../api";

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

const actionReceiveTodos = (filter, todos) => ({
    type: ':RECEIVE_TODOS',
    filter,
    todos
});

export const actionFetchTodos = (filter) =>
    fetchTodos(filter).then(response =>
        actionReceiveTodos(filter, response)
    );


