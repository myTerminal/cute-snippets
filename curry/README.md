# auto-curry

## Usage

Consider a function that takes indefinite number of parameters

    var add = function () {
        return Array.prototype.slice.apply(arguments).reduce(function (a, c) {
            return a + c;
        }, 0);
    };

Create a 'curried' version of the function by

    var curriedAdd = autoCurry(add);

Once you have the curried version of the function, pass parameters as you may and invoke only when you need to with an empty invokation `()`

    curriedAdd(1, 2, 3)(2, 4)(3)();
