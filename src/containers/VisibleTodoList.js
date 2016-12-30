import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {actionToggleTodo} from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;

        case 'completed':
            return todos.filter(t => t.completed);

        case 'active':
            return todos.filter(t => !t.completed);

        default:
            throw new Error(`filter ${filter} is unknown`);
    }
};

const VisibleTodoList = withRouter(connect(
    (state, {params}) => ({
        todos: getVisibleTodos(state.todos, params.filter || 'all' )
    }),

    {
        onTodoClick: actionToggleTodo
    }

)(TodoList));

export default VisibleTodoList;