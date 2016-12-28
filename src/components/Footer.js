import React from 'react'

import FilterLink from '../containers/FilterLink';
import Paper from 'material-ui/Paper';

const Footer = () => (
    <Paper>
        Filter: {' '}
        <FilterLink
            filter="all">
            All
        </FilterLink>{' '}

        <FilterLink
            filter="active">
            Active
        </FilterLink>{' '}

        <FilterLink
            filter="completed">
            Completed
        </FilterLink>
    </Paper>
);

export default Footer;