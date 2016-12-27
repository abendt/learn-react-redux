import {v4} from "uuid";

export const actionAddTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const actionFilterTodo = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const actionToggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});
