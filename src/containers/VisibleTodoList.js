import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as actions from "../actions";
import TodoList from "../components/TodoList";
import {getVisibleTodos} from "../reducers";

class VisibleTodoList extends React.Component {
    componentDidMount = () => {
        this.fetchData();
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    };

    fetchData = () => {
        const {filter, actionFetchTodos} = this.props;

        actionFetchTodos(filter);
    };

    render() {
        return <TodoList
            {...this.props}
            onTodoClick={this.props.actionToggleTodo}
            onDeleteTodo={this.props.actionDeleteTodo}
        />
    }
}

VisibleTodoList = withRouter(connect(
    // state to props
    (state, {params}) => {
        const filter = params.filter || 'all';
        return ({
            filter,
            todos: getVisibleTodos(state, filter)
        });
    },

    // dispatch to props
    actions
)(VisibleTodoList));

export default VisibleTodoList;