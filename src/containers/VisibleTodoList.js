import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as actions from "../actions";
import TodoList from "../components/TodoList";
import {getVisibleTodos, getIsFetching} from "../reducers";

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
        const {actionToggleTodo, actionDeleteTodo, todos, isFetching} = this.props;

        if (isFetching && !todos.length) {
            return <p>Loading ...</p>;
        }

        return <TodoList
            todos={todos}
            onTodoClick={actionToggleTodo}
            onDeleteTodo={actionDeleteTodo}
        />
    }
}

VisibleTodoList = withRouter(connect(
    // state to props
    (state, {params}) => {
        const filter = params.filter || 'all';

        return ({
            filter,
            isFetching: getIsFetching(state, filter),
            todos: getVisibleTodos(state, filter)
        });
    },

    // dispatch to props
    actions
)(VisibleTodoList));

export default VisibleTodoList;