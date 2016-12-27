import React from 'react'

import {ButtonGroup} from 'reactstrap';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
    <div className="panel panel-default">
        <div className="panel-heading">Filter</div>

        <div className="panel-body">
            <ButtonGroup>
                <FilterLink
                    filter="SHOW_ALL">
                    All
                </FilterLink>{' '}

                <FilterLink
                    filter="SHOW_ACTIVE">
                    Active
                </FilterLink>{' '}

                <FilterLink
                    filter="SHOW_COMPLETED">
                    Completed
                </FilterLink>

            </ButtonGroup>
        </div>
    </div>
);

export default Footer;