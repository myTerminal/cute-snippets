/* global exports */

var Promise = function (worker) {
    var output,
        mockedResolve = function (d) {
            output = d;
        };

    return {
        then: function (callback) {
            worker(mockedResolve);
            callback(output);
        }
    };
};

exports.Promise = Promise;
