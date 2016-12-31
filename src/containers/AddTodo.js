import React from "react";
import {connect} from "react-redux";
import {actionAddTodo} from "../actions";
import {Panel, Button, FormGroup, InputGroup, FormControl, Glyphicon} from "react-bootstrap";

let AddTodo = ({dispatch}) => {

    let input;

    const addTodo = () => {
        if (input && input.value) {

            dispatch(actionAddTodo(input.value));

            input.value = '';
        }
    };

    const handleChange = (e) => {
        input = e.target;
    };

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            addTodo();
        }
    };

    return (
        <Panel>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button onClick={() => addTodo()}><Glyphicon glyph="plus"/> Add Todo</Button>
                    </InputGroup.Button>

                    <FormControl type="text"
                                 onChange={handleChange}
                                 onKeyPress={handleKeyPress}
                                 placeholder="enter a Todo"/>
                </InputGroup>
            </FormGroup>
        </Panel>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;