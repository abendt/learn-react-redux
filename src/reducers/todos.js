import undoable, {distinctState} from 'redux-undo';
import todo from "./todo";
import {combineReducers} from "redux";
import {demapify} from 'es6-mapify';

export const byId = (state = {}, action) => {
    switch (action.type) {
        case ':ADD_TODO':
        // fallthrough
        case ':TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };

        case ':DELETE_TODO':
            const asList = Object.keys(state).map(key => state[key]);
            const filteredList = asList.filter((todo) => todo.id !== action.id);
            const asMap = new Map(filteredList.map((todo) => [todo.id, todo]));
            return demapify(asMap);

        default:
            return state;
    }
};

export const allIds = (state = [], action) => {
    switch (action.type) {
        case ':ADD_TODO':
            return [...state, action.id];

        case ':DELETE_TODO':
            return state.filter((t) => t !== action.id);

        default:
            return state;
    }
};

export const todos = combineReducers({
        byId,
        allIds
    }
);

const undoableTodos = undoable(todos, {
    filter: distinctState()
});

export default undoableTodos;

const getAllTodos = (state) =>
    state.allIds.map(todo => state.byId[todo]);

export const getVisibleTodos = (state, filter) => {

    const todos = getAllTodos(state);

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