import {actionToggleTodo} from "./index";

test('actionToggleTodo', () => {
    const expected = {
        type: ':TOGGLE_TODO',
        id: 'my-id'
    };

    const actual = actionToggleTodo('my-id');

    expect(actual).toEqual(expected);
});