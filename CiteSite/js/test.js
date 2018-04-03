var request = require('request');
request('https://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body) // Print the google web page.
    var html = $.parseHTML(body);
    console.log($(html).get("body"))
    
  }
})