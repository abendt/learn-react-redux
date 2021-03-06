import {combineReducers} from "redux";

const createList = (filter) => {
    const ids = (state = [], action) => {
        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            case ':FETCH_TODOS_SUCCESS':
                return action.todos.map(todo => todo.id);

            default:
                return state;
        }
    };

    const isFetchingData = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            case ':FETCH_TODOS_REQUEST':
                return true;
            case ':FETCH_TODOS_SUCCESS':
            case ':FETCH_TODOS_FAILURE':
                return false;
            default:
                return state;
        }
    };

    const errorMessage = (state = null, action) => {
        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            case ':FETCH_TODOS_FAILURE':
                return action.message;
            case ':FETCH_TODOS_REQUEST':
            case ':FETCH_TODOS_SUCCESS':
                return null;
            default:
                return state;
        }
    };

    return combineReducers({
        ids,
        isFetchingData,
        errorMessage
    })
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetchingData;

export const getErrorMessage = (state) => state.errorMessage;