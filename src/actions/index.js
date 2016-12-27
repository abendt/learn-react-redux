export const actionAddTodo = (text) => ({
    type: 'ADD_TODO',
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
