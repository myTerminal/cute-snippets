# history

Before I embraced [AngularJS](https://angularjs.org), my implementations used to be quite old-school with [jQuery](https://jquery.com) as a DOM manipulation library and [Knockout.js](https://knockoutjs.com) playing a major role to bind data to my application views.
I do not remember how and where I came up with this small magical snippet (or was is that I got it from somewhere on the internet), but it seemed to work perfectly for all my routing needs.

I tried to resurrect this small snippet in this modern age of web-frameworks and tried to keep it as close to the original as possible before adding it to the collection here.
*Note: A minute part of the snippet is dependent on jQuery.*

## Usage

### Near the initialization of the application:

    // Initialize our custom history wrapper
    HistoryManager.init(startPage, function (event) {
        // Retrieve the state we are interested in
        var state = event.originalEvent.state;
    
        // A safe-guard...
        if (state) {
            // Call navigation method with path and mark
            navigateToPage(state.path, true);
        }
    });

### Somewhere in the application:

    // The function that takes care of switching views
    var navigateToPage = function (path, isReverse) {
        // Use path to retrieve data, prepare view and load in on the page
        // `isReverse` is to determine if the navigation 'back'
        // <Some meaningful code here...>
    
        if (!isReverse) { // Check if this navigation is due to the 'Back' button
            // Push the current navigation as a state to history
            HistoryManager.pushToHistory(path);
        }
    };