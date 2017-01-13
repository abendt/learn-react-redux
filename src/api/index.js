import uuid from "uuid";

const fakeDatabase = {
    todos: [
        {
            id: uuid(),
            text: 'hey',
            completed: false
        },
        {
            id: uuid(),
            text: 'ho',
            completed: false
        },
        {
            id: uuid(),
            text: 'lets go',
            completed: true
        }
    ]
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
    delay(1000).then(() => {
        switch (filter) {
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter(t => !t.completed);
            case 'completed':
                return fakeDatabase.todos.filter(t => t.completed);
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    });


