import React from 'react'

import {ListGroupItem} from 'reactstrap';

const Todo = ({text, completed, onClick}) => (
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
);

export default Todo;
