import uuid from "uuid";

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

export const actionReceiveTodos = (filter, todos) => ({
    type: ':RECEIVE_TODOS',
    todos
});

