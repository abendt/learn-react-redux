import React from "react";
import {Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const FilterLink = ({filter, children}) => (
    <LinkContainer to={filter === 'all' ? '' : filter}>
        <Button>{children}</Button>
    </LinkContainer>

);

export default FilterLink;