import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from "redux";
import "./index.css";

const {Component} = React;

// Reducer Functions

const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
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
                todo(undefined, action)
            ];

        case 'TOGGLE_TODO':
            return state.map(
                t => todo(t, action)
            );

        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    if (action.type === 'SET_VISIBILITY_FILTER') {
        return action.filter;
    } else {
        return state;
    }
};

// kombinierter Reducer

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

// Store mit Support für Chrome Dev Tools

const store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// functional components haben keinen eigenen Zustand und bestehen nur aus einer Funktion

// presentational components kümmern sich um layout (enthalten HTML)
// Daten kommen via prop rein. rausgehende Aktionen via event callback

const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href="#" onClick={e => {
            e.preventDefault();
            onClick();
        }}>{children}</a>
    );
};

// container component, enthält keine eigenen Layout Informationen, orchestriert Presentational Components
// kennt den Redux State. registriert sich eigenständig beim State für Updates, ist damit flexibler in der Verwendung
// sonst müsste der jeweilige Parent sich auch für Updates registrieren.
// stellt Daten und Verhalten für Presentational Components zur Verfügung

class FilterLink extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();

        return (<Link active={props.filter === state.visibilityFilter}
                      onClick={() =>
                          store.dispatch({
                              type: 'SET_VISIBILITY_FILTER',
                              filter: props.filter
                          })}
        >{props.children}</Link>);
    }
}


const Todo = ({text, completed, onClick}) => {
    return (
        <li
            onClick={() => onClick()}

            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >{text}</li>
    );
};

const TodoList = ({todos, onTodoClick}) => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={() => onTodoClick(todo.id)}/>)
            }
        </ul>
    );
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;

        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);

        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);

        default:
            throw new Error(`filter ${filter} is unknown`);
    }
};


const AddTodo = ({onAddTodo}) => {
    let input;

    return (
        <div>
            <input type="text" ref={node => {
                input = node;
            }}/>

            <button onClick={() => {
                if (input.value) {

                    onAddTodo(input.value);

                    input.value = '';
                }
            }}>Add Todo
            </button>
        </div>
    );
};

const Footer = () => {
    return (
        <p>
            Show: {' '} <FilterLink
            filter="SHOW_ALL"
        >All</FilterLink>

            {' '} <FilterLink
            filter="SHOW_ACTIVE"
        >Active</FilterLink>

            {' '} <FilterLink
            filter="SHOW_COMPLETED"
        >Completed</FilterLink>

        </p>
    );
};

class VisibleTodoList extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getVisibleTodos(todos, filter) {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;

            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);

            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);

            default:
                throw new Error(`filter ${filter} is unknown`);
        }
    };

    render() {
        const props = this.props;
        const state = store.getState();

        return (
            <TodoList todos={getVisibleTodos(state.todos, state.visibilityFilter)}

                      onTodoClick={id =>
                          store.dispatch({
                              type: 'TOGGLE_TODO',
                              id
                          })}
            />
        );
    }
}


// container component schlagen die Brücke zum Redux Dispatcher

let nextToDoId = 0;

const TodoApp = ({todos, visibilityFilter}) => (
    <div>
        <AddTodo onAddTodo={text =>
            store.dispatch({
                type: 'ADD_TODO',
                id: nextToDoId++,
                text
            })}
        />

        <VisibleTodoList />

        <Footer />
    </div>
);


// Hauptkomponente rendern, Zustand aus Store ziehen

const render = () => {
    ReactDOM.render(
        <TodoApp
            {...store.getState()}
        />,
        document.getElementById('root')
    )
};

// bei Änderungen des Store => neu rendern.
store.subscribe(render);
render();
