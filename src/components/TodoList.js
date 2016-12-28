import React from "react";
import Todo from "./Todo";
import {ListGroup, Panel} from "react-bootstrap";

const TodoList = ({todos, onTodoClick}) => (
    <Panel>
        <ListGroup>
            {todos.map(todo =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={() => onTodoClick(todo.id)}/>)
            }
        </ListGroup>
    </Panel>
);

export default TodoList;