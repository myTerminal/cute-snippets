/* global $ */

// A static class exposing only two functions with work with browser history
var HistoryManager = (function () {
    var init = function (initialPath, callback) {
            // Push to the initial path to browser history
            pushToHistory(initialPath);

            // Attach the provided event handler to watch for history changes
            $(window).bind("popstate", callback);
        },
        pushToHistory = function (path, title) {
            // Record path as state information along with title and actual path
            window.history.pushState({ path: path }, title, "/" + path);
        };

    // Expose the only two functions
    return {
        init: init,
        pushToHistory: pushToHistory
    };
})();

exports.History = HistoryManager;