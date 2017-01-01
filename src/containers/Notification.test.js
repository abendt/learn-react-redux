import {shallow, mount, render} from 'enzyme';
import Notification from "./Notification";
import React from "react";
import {createMockStore} from 'redux-test-utils';

jest.useFakeTimers();

test('does not render alert when message is empty', () => {
    const store = createMockStore({
        message: {text: ''}
    });

    const actual = mount(<Notification store={store}/>, {context: {store}});

    expect(actual.find(".alert")).toHaveLength(0);
});

test('does render alert when message is set', () => {
    const store = createMockStore({
        message: {
            id: 'id',
            text: 'bla'}
    });

    const actual = mount(<Notification store={store}/>, {context: {store}});

    expect(actual.find(".alert")).toHaveLength(1);
    expect(actual.text()).toContain("bla");
});

test('remove alerts after timeout', () => {
    const store = createMockStore({
        message: {
            id: 'id',
            text: 'bla'}
    });

    const actual = mount(<Notification store={store}/>, {context: {store}});

    jest.runAllTimers();
    expect(actual.find(".alert")).toHaveLength(0);
});


