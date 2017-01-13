import deepfreeze from "deep-freeze";
import {byId, allIds} from "./todos";

describe.skip("todos reducer", () => {
    it('can add todo', () => {
        const given = undefined;

        const actual = byId(given, {
            type: ':ADD_TODO',
            text: 'Text',
            id: 'id'
        });

        const expected = {
            id: {
                id: 'id',
                completed: false,
                text: 'Text'
            }
        };

        expect(actual).toEqual(expected);
    });

    it('todo is added to existing', () => {
        const given = deepfreeze(
            {
                old: {id: 'old'}
            });

        const actual = byId(given,
            {
                type: ':ADD_TODO',
                text: 'Text',
                id: 'id'
            });

        const expected = {
            old: {
                id: 'old'
            },

            id: {
                id: 'id',
                completed: false,
                text: 'Text'
            }
        };

        expect(actual).toEqual(expected);
    });

    it('can toggle todo', () => {
        const given = deepfreeze({
            id: {
                id: 'id',
                completed: false,
                text: 'Text'
            }
        });

        const actual = byId(given, {
            type: ':TOGGLE_TODO',
            id: 'id'
        });

        const expected = {
            id: {
                id: 'id',
                completed: true,
                text: 'Text'
            }
        };

        expect(actual).toEqual(expected);
    });

    it('byId can delete todo', () => {
        const given = deepfreeze({
            id: {
                id: 'id',
                completed: false,
                text: 'Text'
            }
        });

        const actual = byId(given, {
            type: ':DELETE_TODO',
            id: 'id'
        });

        expect(actual).toEqual({});
    });

    it('delete preserves old', () => {
        const given = deepfreeze({
            id: {
                id: 'id',
                completed: false,
                text: 'Text'
            }
        });

        const actual = byId(given, {
            type: ':DELETE_TODO',
            id: 'x'
        });

        expect(actual).toEqual(given);
    });

    it.skip('addIds can delete todo', () => {
        const given = deepfreeze(['id']);

        const actual = allIds(given, {
            type: ':DELETE_TODO',
            id: 'id'
        });

        expect(actual).toEqual([]);
    });
});

