import React from "react";
import {ListGroupItem, Glyphicon} from "react-bootstrap";

const Todo = ({text, completed, onClick}) => {

    const icon = completed ? 'ok' : 'tasks';

    return (
        <ListGroupItem

            onClick={() => onClick()}

            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        ><Glyphicon glyph={icon} />{' '}
            {text}
        </ListGroupItem>
    );
};

export default Todo;
