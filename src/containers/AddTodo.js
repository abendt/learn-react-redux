import React from 'react';
import {connect} from 'react-redux';
import {actionAddTodo} from '../actions';
import {InputGroup, InputGroupButton} from 'reactstrap';
import {Button, Input} from 'reactstrap';

let AddTodoPresentational = ({dispatch}) => {
    let input;

    return (
        <InputGroup>
            <InputGroupButton>
                <Button onClick={() => {
                    if (input.value) {

                        dispatch(actionAddTodo(input.value));

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

export default AddTodo;