import React from "react";
import {ListGroupItem, Glyphicon, Button, Row, Col} from "react-bootstrap";

const Todo = ({text, completed, onToggleTodo, onDeleteTodo}) => {

    const icon = completed ? 'ok' : 'tasks';

    return (
        <Row id="todoItemRow">
            <Col xs={10}>
                <ListGroupItem
                    id="item"

                    onClick={() => onToggleTodo()}

                    style={{
                        textDecoration: completed ? 'line-through' : 'none'
                    }}
                ><Glyphicon glyph={icon}/>{' '}
                    {text}
                </ListGroupItem>
            </Col>

            <Col xs={1 }>
                <Button id="deleteTodo" onClick={() => onDeleteTodo()} className="btn-circle" >
                    <Glyphicon glyph="remove"/>
                </Button>
            </Col>
        </Row>
    );
};

export default Todo;
