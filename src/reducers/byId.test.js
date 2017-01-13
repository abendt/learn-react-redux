import byId, {getTodo} from "./byId";

describe("byId reducer", () => {
    it('can add a todo', () => {
        const given = byId(undefined, {type: 'OTHER'});

        const actual = byId(given, {
            type: ':ADD_TODO',
            text: 'Text',
            id: 'id'
        });

        expect(getTodo(actual, 'id')).toBeDefined();
    })
});
