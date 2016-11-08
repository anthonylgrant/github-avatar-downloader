var request = require('request');
var GITHUB_USER = "YOUR USERNAME HERE";
var GITHUB_TOKEN = "YOUR ACCESSTOKEN HERE";

var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  request.get(requestURL)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Status Message: ', response.headers['content-type'])
         console.log('Downloading image...');

       })
       console.log('Downloading Image...');
       .pipe(fs.createWriteStream('./...'));
       console.log('Download complete.');

}
//

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});




console.log('Welcome to the GitHub Avatar Downloader!');
