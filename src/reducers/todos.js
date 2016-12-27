const maxId = (todos) =>
    Math.max(-1, ...todos.map( (t) => t.id ));

const todo = (todos, state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: maxId(todos) + 1,
                text: action.text,
                completed: false
            };

        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };

        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(state, undefined, action)
            ];

        case 'TOGGLE_TODO':
            return state.map(
                t => todo(state, t, action)
            );

        default:
            return state;
    }
};

export default todos;