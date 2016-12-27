import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from "redux";
import "./index.css";

import {Provider, connect} from "react-redux";

import {Button, ButtonGroup, Input} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {InputGroup, InputGroupItem, InputGroupButton} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';

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


// functional components haben keinen eigenen Zustand und bestehen nur aus einer Funktion

// presentational components kümmern sich um layout (enthalten HTML)
// Daten kommen via prop rein. rausgehende Aktionen via event callback

const Link = ({active, children, onClick}) => {
    return (
        <Button color="primary" active={active}
                href="#" onClick={() => {
            onClick();
        }}>{children}</Button>
    );
};

// container component, enthält keine eigenen Layout Informationen, orchestriert Presentational Components
// kennt den Redux State. registriert sich eigenständig beim State für Updates, ist damit flexibler in der Verwendung
// sonst müsste der jeweilige Parent sich auch für Updates registrieren.
// stellt Daten und Verhalten für Presentational Components zur Verfügung


const FilterLink = connect(
    (store, ownProps) => {
        return {
            active: ownProps.filter === store.visibilityFilter
        };
    },

    (dispatch, ownProps) => {
        return {
            onClick: () =>
                dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: ownProps.filter
                })
        };
    }
)(Link);


const Todo = ({text, completed, onClick}) => {
    return (
        <div>
            <ListGroupItem
                onClick={() => onClick()}

                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
            >

                <span className={`glyphicon ${completed ? 'glyphicon-star' : 'glyphicon-star-empty'}`}
                      aria-hidden="true"/>

                {text}
            </ListGroupItem>
        </div>
    );
};

const TodoList = ({todos, onTodoClick}) => {
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <ListGroup>
                    {todos.map(todo =>
                        <Todo key={todo.id}
                              {...todo}
                              onClick={() => onTodoClick(todo.id)}/>)
                    }
                </ListGroup>
            </div>
        </div>
    );
};

let nextToDoId = 0;

let AddTodoPresentational = ({dispatch}) => {
    let input;

    return (
        <InputGroup>
            <InputGroupButton>
                <Button onClick={() => {
                    if (input.value) {

                        dispatch({
                            type: 'ADD_TODO',
                            id: nextToDoId++,
                            text: input.value
                        });

                        input.value = '';
                    }
                }}>Add Todo</Button>
            </InputGroupButton>

            <Input getRef={node => {
                input = node;
            }}/>
        </InputGroup>
    );
};

const AddTodo = connect()(AddTodoPresentational);

const Footer = () => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">Filter</div>

            <div className="panel-body">
                <ButtonGroup>
                    <FilterLink
                        filter="SHOW_ALL">
                        All
                    </FilterLink>{' '}

                    <FilterLink
                        filter="SHOW_ACTIVE">
                        Active
                    </FilterLink>{' '}

                    <FilterLink
                        filter="SHOW_COMPLETED">
                        Completed
                    </FilterLink>

                </ButtonGroup>
            </div>
        </div>
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

const VisibleTodoList = connect(
    (state) => ({
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }),

    (dispatch) => ({
        onTodoClick: (id) => dispatch({
            type: 'TOGGLE_TODO',
            id
        })
    })
)
(TodoList);


// container component schlagen die Brücke zum Redux Dispatcher


const TodoApp = () => (
    <div>
        <Row>
            <Col><AddTodo /></Col>
        </Row><br />

        <Row><Col>
            <VisibleTodoList />
        </Col></Row>

        <Row><Col>
            <Footer />
        </Col></Row>
    </div>
);

// Store mit Support für Chrome Dev Tools


const store = createStore(todoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Hauptkomponente rendern, Zustand aus Store ziehen

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Container>
                <Row>
                    <Col>
                        <h1>React/Redux Todo Tutorial</h1>
                    </Col>
                </Row>

                <TodoApp
                    {...store.getState()}
                />
            </Container>
        </Provider>,
        document.getElementById('root')
    )
};

// bei Änderungen des Store => neu rendern.
store.subscribe(render);
render();
