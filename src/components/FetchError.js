import React, {PropTypes} from "react";
import {Panel, Button} from "react-bootstrap";

const FetchError = ({message, onRetry}) => {
    return (
        <Panel>
            <p>could not fetch Todos {message}</p>
            <Button onClick={onRetry} >Retry</Button>
        </Panel>
    );
};

FetchError.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired
};
FetchError.defaultProps = {};

export default FetchError;
