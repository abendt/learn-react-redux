import {connect} from "react-redux";
import {withRouter} from "react-router";
import {actionToggleTodo} from "../actions";
import TodoList from "../components/TodoList";
import {getVisibleTodos} from "../reducers";

const VisibleTodoList = withRouter(connect(
    (state, {params}) => ({
        todos: getVisibleTodos(state, params.filter || 'all')
    }),

    {
        onTodoClick: actionToggleTodo
    }
)(TodoList));

export default VisibleTodoList;