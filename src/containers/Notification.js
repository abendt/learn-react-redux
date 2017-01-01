import React from "react";
import {AlertList} from "react-bs-notifier";

const defaultPosition = "top-right";
const defaultTimeout = 1000;

const messageToAlert = (message = {text: ''}) => {
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

const messageToAlerts = (message) => {
    const alert = messageToAlert(message);

    return alert ? [alert] : [];
};

export class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.store = context.store;

        this.onAlertDismissed = this.onAlertDismissed.bind(this);

        this.updateState();
    }

    updateState() {
        const message = this.store.getState().message;

        this.state = {
            alerts: messageToAlerts(message)
        };
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
                this.updateState();
                this.forceUpdate();
            }
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onAlertDismissed(alert) {

        const currentAlerts = this.state.alerts;
        const updatedAlerts = currentAlerts.filter(a => a.id !== alert.id);

        this.setState({
            alerts: updatedAlerts
        });
    }

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