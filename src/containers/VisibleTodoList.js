import {connect} from 'react-redux'
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

const VisibleTodoList = connect(
    (state, ownProps) => ({
        todos: getVisibleTodos(state.todos, ownProps.filter)
    }),

    (dispatch) => ({
        onTodoClick: (id) => dispatch(actionToggleTodo(id))
    })
)(TodoList);

export default VisibleTodoList;