import React from "react";
import {AlertList} from "react-bs-notifier";

const defaultPosition = "top-right";
const defaultTimeout = 1000;

const messageToAlert = (message = {text: ''}) => {
    if (message.text !== '') {
        return {
            id: (new Date()).getTime(),
            type: message.type || 'success',
            headline: `Whoa!`,
            message: message.text
        }
    } else {
        return undefined;
    }
};

export class Notification extends React.Component {

    state = {alerts: []};

    constructor(props, context) {
        super(props, context);

        this.store = context.store;
    }

    updateState = () => {
        const message = this.store.getState().message;

        if (message) {
            const alerts = this.state.alerts;
            const alert = messageToAlert(message);

            if (alert) {
                alerts.push(alert);

                this.setState({
                    alerts
                });
            }
        }
    };

    componentDidMount = () => {
        this.unsubscribe = this.store.subscribe(() => {
                this.updateState();
                this.forceUpdate();
            }
        );
    };

    componentWillUnmount = () => {
        this.unsubscribe();
    };

    onAlertDismissed = (alert) => {
        const currentAlerts = this.state.alerts;
        const updatedAlerts = currentAlerts.filter(a => a.id !== alert.id);

        this.setState({
            alerts: updatedAlerts
        });
    };

    render() {
        return (
            <AlertList
                position={defaultPosition}
                alerts={this.state.alerts}
                timeout={defaultTimeout}
                dismissTitle="Begone!"
                onDismiss={this.onAlertDismissed}
            />
        );
    }
}

Notification.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default Notification;