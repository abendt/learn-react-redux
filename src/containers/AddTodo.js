import React from "react";
import {connect} from "react-redux";
import {actionAddTodo} from "../actions";
import {Panel, Button, FormGroup, InputGroup, FormControl, Glyphicon} from "react-bootstrap";

let AddTodo = ({dispatch}) => {

    let input;

    const addTodoClicked = () => {
        if (input && input.value) {
            console.log("clicked");
            dispatch(actionAddTodo(input.value));

            input.value = '';
        }
    };

    const handleChange = (e) => {
        input = e.target;
    };

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            addTodoClicked();
        }
    };

    return (
        <Panel>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button id="addTodoButton" onClick={() => addTodoClicked()}><Glyphicon glyph="plus"/> Add Todo</Button>
                    </InputGroup.Button>

                    <FormControl id="addTodoText"
                                 type="text"
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