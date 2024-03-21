// #1 - import the request module, which is used to download data over http
const request = require('request');

// #2 - set our URL
let url = 'https://geek-jokes.sameerkumar.website/api';

// #3 - make the request
// the second parameter below is a callback function (an ES6 arrow function in this case)
// which is called when the data is downloaded
request(url, (err, response, body) => {
    // if there's no error, and if the server's status code is 200 (i.e. "Ok")
    if(!err && response.statusCode == 200){
    	// log out the plain-text joke - no parsing required!
        console.log(body);
    }
});