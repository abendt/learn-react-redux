import React from 'react'

import FilterLink from '../containers/FilterLink';
import {Panel} from 'react-bootstrap';

const Footer = () => (
    <Panel header="Filter">
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
    </Panel>
);

export default Footer;