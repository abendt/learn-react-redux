import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import * as actions from "../actions";
import TodoList from "../components/TodoList";
import {getVisibleTodos, getIsFetching, getErrorMessage} from "../reducers";
import FetchError from "../components/FetchError";
import {Panel} from "react-bootstrap";

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

        actionFetchTodos(filter).then(() => console.log("done"));
    };

    render() {
        const {actionToggleTodo, actionDeleteTodo, todos, isFetching, errorMessage} = this.props;

        if (errorMessage && !todos.length) {
            return (<FetchError message={errorMessage} onRetry={() => this.fetchData()}/>)
        }

        if (isFetching && !todos.length) {
            return <Panel>Loading ...</Panel>;
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
            errorMessage: getErrorMessage(state, filter),
            todos: getVisibleTodos(state, filter)
        });
    },

    // dispatch to props
    actions
)(VisibleTodoList));

export default VisibleTodoList;