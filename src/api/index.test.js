import {fetchTodos} from "./index";

test('can fetch all todos', () => {
    return fetchTodos("all")
        .then(result => expect(result).toHaveLength(3));
});