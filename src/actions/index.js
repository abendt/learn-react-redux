import {v4} from "uuid";

export const actionAddTodo = (text) => ({
    type: ':ADD_TODO',
    id: v4(),
    text
});

export const actionToggleTodo = (id) => ({
    type: ':TOGGLE_TODO',
    id
});

export const actionResetNotification = () => ({
   type: ':RESET_NOTIFICATION'
});

