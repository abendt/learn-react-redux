var EC = protractor.ExpectedConditions;

describe('Todo App', function () {

    var addTodoButton = element(by.id('addTodoButton'));
    var addTodoText = element(by.id('addTodoText'));
    var todoRows = element.all(by.id('todoItemRow'));
    var todoItems = todoRows.all(by.id('item'));
    var filterLinks = element.all(by.id('filterLink'));

    it('can add Todo', function () {
        browser.get('/');

        addTodoText.sendKeys("new TODO");
        addTodoButton.click();
        browser.wait(presenceOfAll(todoRows), 1000);
        console.log("created todo");

        filterLinks.get(2).click();
        browser.wait(EC.invisibilityOf($("#todoItemRow #item")), 1000);
        console.log("filtered finished");

        filterLinks.get(1).click();
        const todo = todoItems.first();
        expect(todo.getText()).toBe('new TODO');
        console.log("filtered active");

        todoItems.get(0).click();
        browser.wait(EC.invisibilityOf($("#todoItemRow #item")), 1000);
        console.log("toggled todo");

        filterLinks.get(0).click();
        todoRows.all(by.id("deleteTodo")).click();
        console.log("filtered all");

        browser.wait(EC.invisibilityOf($("#todoItemRow #item")), 1000);
        console.log("deleted todo");
    });

});

const presenceOfAll = (elementArrayFinder) => function () {
    return elementArrayFinder.count((count) => {
        return count > 0;
    });
};


const highlightElement = (el) => {
    console.log("highlight--");

    console.log("locator---:" + el.locator());

    return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);",
        el.getWebElement(),
        "color: Red; border: 2px solid red;").then(() => {
        browser.sleep(2000);
        return el;
    }, function (err) {
        console.log("error is :" + err);
    });
};