import undoable, {distinctState} from 'redux-undo';
import todo from "./todo";
import {combineReducers} from "redux";

export const byId = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        // fallthrough
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };

        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id];

        default:
            return state;
    }
};

const todos = combineReducers({
        byId,
        allIds
    }
);

const undoableTodos = undoable(todos, {
    filter: distinctState()
});

export default undoableTodos;

const extractTodos = (state) =>
    state.allIds.map(todo => state.byId[todo]);

export const getVisibleTodos = (state, filter) => {
    const todos = extractTodos(state);

    switch (filter) {
        case 'all':
            return todos;

        case 'completed':
            return todos.filter(t => t.completed);

        case 'active':
            return todos.filter(t => !t.completed);

        default:
            throw new Error(`filter ${filter} is unknown`);
    }
};