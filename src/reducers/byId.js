import {demapify} from 'es6-mapify';
import todo from "./todo";

const byId = (state = {}, action) => {
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

        case ':FETCH_TODOS_SUCCESS':
            const nextState = {...state};
            action.todos.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};

export default byId;

export const getTodo = (state, id) => state[id];