import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import {connect} from "react-redux";
import {ActionCreators as UndoActionCreators} from "redux-undo";

let UndoRedo = ({canUndo, canRedo, onUndo, onRedo}) => (
    <ButtonToolbar>
        <Button onClick={onUndo} disabled={!canUndo}>
            Undo
        </Button>

        <Button onClick={onRedo} disabled={!canRedo}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onUndo: () => dispatch(UndoActionCreators.undo()),

        onRedo: () => dispatch(UndoActionCreators.redo())
    };
};

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo);

export default UndoRedo;