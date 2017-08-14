# promises

## Usage

Instantiate a promise as

    var later = new Promise(function (resolve) {
        setTimeout(function () {
            resolve('hi there');
        }, 5000);
    });

Consume the obtained promise as

    later.then(function (data) {
        console.log(data);
    });
