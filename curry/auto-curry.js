/* global exports */

var autoCurry = function (func) {
    var inner = function (previous, current) {
        return current.length ?
            function () {
                return inner(previous.concat(current),
                             Array.prototype.slice.apply(arguments));
            } :
            func.apply(null, previous);
    };

    return function () {
        var args = Array.prototype.slice.apply(arguments);

        return args.length ?
            inner([], args) :
            func();
    };
};

exports.autoCurry = autoCurry;
