import React, {PropTypes} from "react";
import {Button} from "react-bootstrap";

const FetchError = ({message, onRetry}) => {
    return (
        <div>
            <p>could not fetch Todos {message}</p>
            <Button onClick={onRetry} >Retry</Button>
        </div>
    );
};

FetchError.propTypes = {
    message: React.PropTypes.string.isRequired,
    onRetry: React.PropTypes.func.isRequired
};
FetchError.defaultProps = {};

export default FetchError;
