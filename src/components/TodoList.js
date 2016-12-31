import React from "react";
import Todo from "./Todo";
import {ListGroup, Panel} from "react-bootstrap";

const TodoList = ({todos, onTodoClick, onDeleteTodo}) => {

    return (
        <Panel>
            <ListGroup>
                {todos.map(todo =>
                    <Todo key={todo.id}
                          {...todo}
                          onToggleTodo={() => onTodoClick(todo.id)}
                          onDeleteTodo={() => onDeleteTodo(todo.id)}
                    />)
                }
            </ListGroup>
        </Panel>
    );
};

export default TodoList;