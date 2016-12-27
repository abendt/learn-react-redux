import React from 'react'

import {Button} from 'reactstrap';

const Link = ({active, children, onClick}) => (
    <Button color="primary" active={active}
            href="#" onClick={() => {
        onClick();
    }}>{children}</Button>
);

export default Link;