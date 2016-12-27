import {connect} from 'react-redux';
import {actionFilterTodo} from '../actions';
import Link from '../components/Link';

const FilterLink = connect(
    (store, ownProps) => ({
        active: ownProps.filter === store.visibilityFilter
    }),

    (dispatch, ownProps) => ({
        onClick: () =>
            dispatch(actionFilterTodo(ownProps.filter))
    })
)(Link);

export default FilterLink;