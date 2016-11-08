var GITHUB_USER = "anthonylgrant";
var GITHUB_TOKEN = "e39e82b43716ac46abaaf1bcd1207da12960fd20";

var util = require('util');
var fs = require('fs');

//This gives us a parametrized instance of Request, tailored to talk to github API
var request = require('request').defaults({
  auth: {
    user: GITHUB_USER,
    pass: GITHUB_TOKEN
  },
  headers: {
    'User-Agent': 'Stuff/1.0' // Github mandates User-Agent header on all API requests, (Solves 403 error)
  },
  json: true
});

// function githubUrl(url) {
//   return {
//     url: url,
//     headers: {
//       'User-Agent': 'something else'
//     },
//     json: true
//   };
// }

function avatarMapper(contrubutor) {
  return {
    name: contrubutor.login,
    avatar_url: contrubutor.avatar_url
  };
}

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  request.get(requestURL, function(err, response, body)
  {
    if(err)
    {
      return cb(err);
    }
    var avatar_urls = body.map(avatarMapper); //passing in function avatarMapper that will EVENTUALLY return value for each element
    cb(null, avatar_urls);
  });
  // Note 1
  // .on('error', function (err) { // Note 2
  //   throw err; // that also wouldn't work
  // })
  // .on('data', function(chunk)
  // {
  //    console.log(chunk.toString().length);
  // })
  // .on('response', function (response) {                           // Note 3
  //  // console.log(response.rawHeaders.join(' ').length);
  //   console.log('Response Status Code: ', response.statusCode);
  //   console.log('Response Status Message: ', response.headers['content-type'])
  //   console.log('This is the body string: ', util.inspect(response, { colors: true, depth: 0 }))
  // })
};
//

function downloadGithubAvatar(contributor, cb) {
  console.log('Downloading GitHub Avatar:');
  console.log(contributor);

  var stream = fs.createWriteStream('./avatars/' + contributor.name + '.jpg');

  request
    .get(contributor.avatar_url)
    .on('error', function(error) {
      cb && cb(error);
    })
    .pipe(stream)
    .end(function(){
      cb && cb(null);
    })
}

//Starts here
getRepoContributors("jensen", "gitfun", function(err, avatar_urls) {
  if(err) {
    console.err(err);
    return;
  }
  // console.log("Result:", result);

  avatar_urls.forEach(function(contributor) {
    downloadGithubAvatar(contributor);
  });
});




console.log('Welcome to the GitHub Avatar Downloader!');
