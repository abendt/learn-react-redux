import React from "react";
import Todo from "./Todo";
import {List} from "material-ui/List";
import Paper from "material-ui/Paper";

const TodoList = ({todos, onTodoClick}) => (
    <Paper>
        <List>
            {todos.map(todo =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={() => onTodoClick(todo.id)}/>)
            }
        </List>
    </Paper>
);

export default TodoList;