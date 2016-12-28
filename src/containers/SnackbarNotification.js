import React from "react";

import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';

let SnackbarNotification = ({message}) => (
    <Snackbar
        open={message.text !== ''}
        message={message.text}
        autoHideDuration={4000}
    />
);

SnackbarNotification = connect(
    state => ({
        message: state.message
    })
)(SnackbarNotification);

export default SnackbarNotification;