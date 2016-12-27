import React from 'react'

import {ListGroup} from 'reactstrap';
import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) => (
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

export default TodoList;