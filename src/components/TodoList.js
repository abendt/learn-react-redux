import React from "react";
import Todo from "./Todo";
import {ListGroup} from "react-bootstrap";

const TodoList = ({todos, onTodoClick, onDeleteTodo}) => {

    return (
        <ListGroup>
            {todos.map(todo =>
                <Todo key={todo.id}
                      {...todo}
                      onToggleTodo={() => onTodoClick(todo.id)}
                      onDeleteTodo={() => onDeleteTodo(todo.id)}
                />)
            }
        </ListGroup>
    );
};

export default TodoList;