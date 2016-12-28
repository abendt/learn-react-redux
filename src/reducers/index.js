import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const message = (state = {text: '', id: 0}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                text: 'created todo',
                id: Math.random()
            };

        default:
            return {
                ...state,
                text: '',
            };
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter,
    message
});

export default todoApp;