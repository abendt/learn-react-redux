import React from "react";
import {Button, ButtonToolbar, Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import {ActionCreators as UndoActionCreators} from "redux-undo";

let UndoRedo = ({canUndo, canRedo, onUndo, onRedo}) => (
    <ButtonToolbar>
        <Button onClick={onUndo} disabled={!canUndo}>
            <Glyphicon glyph="step-backward"/>
            Undo
        </Button>

        <Button onClick={onRedo} disabled={!canRedo}>
            <Glyphicon glyph="step-forward"/>
            Redo
        </Button>
    </ButtonToolbar>
);

const mapStateToProps = (state) => {
    return {
        canUndo: state.todos.past.length > 0,

        canRedo: state.todos.future.length > 0
    };
};

UndoRedo = connect(
    mapStateToProps,

    {
        onUndo: UndoActionCreators.undo,

        onRedo: UndoActionCreators.redo
    }
)(UndoRedo);

export default UndoRedo;