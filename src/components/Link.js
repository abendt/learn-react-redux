import React from 'react'

const Link = ({active, children, onClick}) => (
    <Button color="primary"

            active={active}

            href="#"

            onClick={() => {
                onClick();
            }}>

        {children}

    </Button>
);

export default Link;