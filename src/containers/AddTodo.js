import React from "react";
import {connect} from "react-redux";
import {actionAddTodo} from "../actions";
import {Panel, Button, FormGroup, InputGroup, FormControl, Glyphicon} from "react-bootstrap";

let AddTodo = ({dispatch}) => {

    let input;

    const handleChange = (e) => {
        input = e.target;
    };

    return (
        <Panel>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button onClick={() => {
                            if (input && input.value) {

                                dispatch(actionAddTodo(input.value));

                                input.value = '';
                            }
                        }}><Glyphicon glyph="plus" /> Add Todo</Button>
                    </InputGroup.Button>
                    <FormControl type="text" onChange={handleChange}/>
                </InputGroup>
            </FormGroup>
        </Panel>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;