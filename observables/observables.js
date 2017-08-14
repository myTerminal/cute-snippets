/* global exports */

var Observables = (function () {
    var observablesMap = [],
        storedUndefined = undefined;

    return {
        observable: function (v) {
            var value,
                subscribers = [];

            var returnedObservable = function (val) {
                var self = arguments.callee;

                if (val !== storedUndefined) {
                    value = val;
                    subscribers.forEach(s => s(val));
                } else {
                    observablesMap.filter(o => o.func === self).
                        forEach(r => r.count++);

                    return value;
                }
            };

            returnedObservable.subscribe = f => subscribers.push(f);

            returnedObservable.peek = () => value;

            observablesMap.push({
                func: returnedObservable,
                count: 0
            });

            returnedObservable(v);

            return returnedObservable;
        },
        computed: function (evaluator) {
            var value,
                subscribers = [];

            var oldMap = observablesMap.map(o => ({
                func: o.func,
                count: o.count
            }));

            value = evaluator();

            observablesMap.filter(function (o, i) {
                return o.count != oldMap[i].count;
            }).forEach(function (o) {
                o.func.subscribe(function () {
                    value = evaluator();
                    subscribers.forEach(s => s(value));
                });
            });

            var returnedObservable = function (x) {
                var self = arguments.callee;

                if (x) {
                    console.error("Cannot write into a computed observable!");
                } else {
                    value = evaluator();

                    observablesMap.filter(o => o.func === self).
                        forEach(r => r.count++);

                    return value;
                }
            };

            returnedObservable.subscribe = f => subscribers.push(f);

            returnedObservable.peek = () => value;

            observablesMap.push({
                func: returnedObservable,
                count: 0
            });

            return returnedObservable;
        },
        observableArray: function (ar) {
            var value,
                subscribers = [];

            var returnedObservableArray = function (val) {
                var self = arguments.callee;

                if (val !== storedUndefined) {
                    value = val;
                    subscribers.forEach(s => s(val));
                } else {
                    observablesMap.filter(o => o.func === self).
                        forEach(r => r.count++);

                    return value;
                }
            };

            returnedObservableArray.subscribe = f => subscribers.push(f);

            returnedObservableArray.peek = () => value;

            observablesMap.push({
                func: returnedObservableArray,
                count: 0
            });

            returnedObservableArray.push = function (el) {
                value.push(el);
                subscribers.forEach(s => s(value));
            };

            returnedObservableArray.pop = function (el) {
                value.pop(el);
                subscribers.forEach(s => s(value));
            };

            returnedObservableArray(ar);

            return returnedObservableArray;
        }
    };
})();

exports = Observables;
