// Request required modules
var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

// MAIN FUNCTION
function getRepoContributors(repoOwner, repoName, callback) {
  // Set options for request
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
    'User-Agent': 'aaronfordnet',
    Authorization: secrets.GITHUB_TOKEN
    }
  }

  // Make request
  request(options, function(err, response, body) {
    // Parse requested string into JSON, and pass it into callback function's 'result' parameter
    var parsed = JSON.parse(body);
    callback(err, parsed)
  })
}

// CALL MAIN FUNCTION
getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) {
    console.log("Error received:", err);
  }
  // Loop over each item in parsed data from Github, call downloadImageByURL function for each user
  result.forEach(function(user) {
    var login = user.login;
    var url = user.avatar_url;
    var path = `./avatars/${login}.jpg`;
    downloadImageByURL(url, path, login)
  })
});

// DOWNLOAD IMAGE FUNCTION
function downloadImageByURL(url, filePath, userName) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloading avatar image:', userName);
       })
       .pipe(fs.createWriteStream(filePath));
}
