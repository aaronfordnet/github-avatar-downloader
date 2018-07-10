// Request required modules
require('dotenv').config();
var request = require('request');
var fs = require('fs');

// Set owner and repo variables from command line input
// E.g. > node download_avatars.js jquery jquery
var owner = process.argv.slice(2, 3).join('');
var repo = process.argv.slice(3, 4).join('');

// MAIN FUNCTION
function getRepoContributors(repoOwner, repoName, callback) {

  // Check for valid command line input
  if (!repoOwner || !repoName) {
    console.log('Input Error - Please enter a valid repo owner and name.');
    console.log('Example: node download_avatars.js <owner> <repo>');
    return;
  }

  // Set options for request
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'aaronfordnet',
      Authorization: process.env.GITHUB_TOKEN,
    },
  };

  // Make request
  request(options, function (err, response, body) {
    // Parse requested string into JSON, and pass it into callback function's 'result' parameter
    var parsed = JSON.parse(body);
    callback(err, parsed);
  });
}

// CALL MAIN FUNCTION (with callback function)
getRepoContributors(owner, repo, function (err, result) {
  if (err) {
    console.log('Error received:', err);
  }

  // Loop over each item in parsed data from Github, call downloadImageByURL function for each user
  result.forEach(function (user) {
    var login = user.login;
    var url = user.avatar_url;
    var path = `./avatars/${login}.jpg`;
    downloadImageByURL(url, path, login);
  });
});

// DOWNLOAD IMAGE FUNCTION
function downloadImageByURL(url, filePath, userName) {
  request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response) {
        console.log('Downloading avatar:', userName);
      })
       .pipe(fs.createWriteStream(filePath));
}
