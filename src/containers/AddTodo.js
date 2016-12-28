import React from 'react';
import {connect} from 'react-redux';
import {actionAddTodo} from '../actions';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <Paper>
            <FlatButton onClick={() => {
                if (input.value) {

                    dispatch(actionAddTodo(input.value));

                    input.value = '';

                }
            }}>Add Todo
            </FlatButton>

            <TextField id="addTodoText" type="text" ref={node => {
                input = node.input;
            }}/>
        </Paper>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;