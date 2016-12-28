import React from "react";
import {connect} from "react-redux";
import {AlertList} from "react-bs-notifier";
import {actionResetNotification} from '../actions'

const alertFromMessage = (message) => {
    if (message.text !== '') {
        return {
            id: (new Date()).getTime(),
            type: 'success',
            headline: `Whoa!`,
            message: message.text
        }
    } else {
        return undefined;
    }
};

const alertsFromMessage = (message) => {
    const al = alertFromMessage(message);

    return al ? [al] : [];
};

const alertListState = (message) => ({
    position: "top-right",
    alerts: alertsFromMessage(message),
    timeout: 1000
});

let Notification = ({message, onAlertDismissed}) => {

    const myState = alertListState(message);

    return (
        <AlertList
            position="top-right"
            alerts={myState.alerts}
            timeout={1000}
            dismissTitle="Begone!"
            onDismiss={onAlertDismissed}
        />
    );
};

Notification = connect(
    state => ({
        message: state.message
    }),

    dispatch => ({
        onAlertDismissed: (it) => dispatch(actionResetNotification())
    })
)(Notification);

export default Notification;