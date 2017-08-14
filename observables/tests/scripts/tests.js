var firstName,
    lastName,
    fullName,
    crew,
    changedFirstName,
    changedFullName,
    unchangedFullName,
    changedArray,
    unchangedArray,
    notSoComputedName,
    notSoComputedCrew;

QUnit.test("Tests for observables", function(assert) {
    QUnit.module("Observables");
    
    firstName = ko.observable("John");
    assert.equal(firstName(), "John", "Observable is initialized with the passed value");

    firstName("Loco");
    assert.equal(firstName(), "Loco", "Observable can be updated with a new value");

    changedFirstName = "";
    firstName.subscribe(function (name) {
        changedFirstName = name;
    });
    firstName("John");
    assert.equal(changedFirstName, "John", "Observable can be subscribed to");

    QUnit.module("Computed Observables");
    
    lastName = ko.observable("Shepard");
    fullName = ko.computed(function () {
        return lastName() + ", " + firstName();
    });
    assert.equal(fullName(), "Shepard, John", "Computed observable is intialized with the evaluator");

    firstName("Jane");
    assert.equal(fullName(), "Shepard, Jane", "Computed gets updated when one or more dependencies are updated");
    
    fullName.subscribe(function (name) {
        changedFullName = name;
    });
    firstName("John");
    assert.equal(changedFullName, "Shepard, John", "Computed observable can be subscribed to");

    notSoComputedName = ko.computed(function () {
        return lastName.peek() + ", " + firstName.peek();
    });
    notSoComputedName.subscribe(function (name) {
        unchangedFullName = name;
    });
    firstName("Jane");
    assert.ok(!unchangedFullName, "Peek helps avoid a dependency");

    QUnit.module("Observable Arrays");

    crew = ko.observableArray(["Shepard", "Vakarian", "T'Soni"]);
    assert.deepEqual(crew(), ["Shepard", "Vakarian", "T'Soni"], "Observable array gets initialized with the sent array");

    crew.push("Joker");
    assert.equal(crew().length, 4, "Observable array can be pushed with a new value");

    crew.subscribe(function (array) {
        changedArray = array;
    });
    crew.pop();
    assert.deepEqual(changedArray, crew(), "Observable array can be subscribed to");

    notSoComputedCrew = ko.computed(function () {
        return crew.peek().length;
    });
    notSoComputedCrew.subscribe(function (array) {
        unchangedArray = array;
    });
    crew(["Shepard"]);
    assert.ok(!unchangedArray, "Peek helps avoid a dependency");
});
