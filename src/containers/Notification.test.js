import {shallow, mount, render} from 'enzyme';
import Notification from "./Notification";
import React from "react";
import {createMockStore} from 'redux-test-utils';

jest.useFakeTimers();

const emptyStoreWith = () => {
    const state = {
        message: {text: ''}
    };

    const store = createMockStore(state);

    store.subscriptions = [];
    store.subscribe = (cb) => store.subscriptions.push(cb);

    store.updateMessage = (s) => {
        state.message = s;
        store.subscriptions.forEach(sub => sub());
    };

    return store;
};

describe("Notification component", () => {
    it('does not render alert when message is empty', () => {
        const store = emptyStoreWith();

        const actual = mount(<Notification store={store}/>, {context: {store}});

        expect(actual.find(".alert")).toHaveLength(0);
    });

    it('does render alert when message is set', () => {
        const store = emptyStoreWith();

        const actual = mount(<Notification store={store}/>, {context: {store}});

        store.updateMessage(
        {
            id: 'id',
            text: 'MessageXYZ'
        });

        expect(actual.find(".alert")).toHaveLength(1);
        expect(actual.text()).toContain("MessageXYZ");
    });

    it('remove alerts after timeout', () => {
        const store = emptyStoreWith();
        const actual = mount(<Notification store={store}/>, {context: {store}});
        store.updateMessage(
            {
                id: 'id',
                text: 'MessageXYZ'
            });

        jest.runAllTimers();
        expect(actual.find(".alert")).toHaveLength(0);
    })
});