import undoable, {distinctState} from 'redux-undo';
import {combineReducers} from "redux";

import createList, * as fromList from "./createList";
import byId, * as fromById from "./byId";

const idsByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
});

export const todos = combineReducers({
        byId,
        idsByFilter
    }
);

export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.idsByFilter[filter]);

    return ids.map(id => fromById.getTodo(state.byId, id));
};

const undoableTodos = undoable(todos, {
    filter: distinctState()
});

export default undoableTodos;