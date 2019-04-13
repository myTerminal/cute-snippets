# observables

## Background

This one came out as a result of a casual competition in my team at my workplace to try to implement a small part of a JavaScript library like [Knockout.js](https://knockoutjs.com).
We had so much fun while sharing our implementations with others and learned a little about observables as well.

## Usage

Create an observable as

    var firstName = Observables.observable('John');

Read the value of an observable as

    console.log(firstName());

Subscribe to changes as

    firstName.subscribe(function (name) {
        console.log('First name changed to', name);
    });

Create dependent observables as

    var fullName = Observables.computed(function () {
        return lastName() + ', ' + firstName();
    });

Dependent observables change when their dependencies change. You can also subscribe to changes to dependent observables as you can for regular observables.

Dependent observables can be made independent of specific observables with the use of `peek()` function as

    var otherName = Observables.computed(function () {
        return lastName() + ', ' + firstName.peek();
    });

The above observable would only change (and trigger subscriptions to it) for changes to the `lastName` and not for `firstName`.

Create an observable array as

    var names = Observables.observableArray(['Shepard', 'Garrus', 'Liara']);

Read an observable array as

    console.log(names());

Make changes to an observable array as

    names.push('Joker');

Subscribe to changes to an observable array as

    names.subscribe(function (newArray) {
        console.log('The array has been changed to', newArray);
    });

Changes to an observable array can also be 'peeked' as

    console.log(names.peek());
