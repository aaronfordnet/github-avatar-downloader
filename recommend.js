// Request required modules
require('dotenv').config();
var request = require('request');
var fs = require('fs');
var counter = {};
// Set owner and repo variables from command line input
// E.g. > node download_avatars.js jquery jquery
var owner = process.argv.slice(2, 3).join('');
var repo = process.argv.slice(3, 4).join('');


// MAIN FUNCTION
function getRepoContributors(repoOwner, repoName, callback) {

  // Set options for request
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'recommend_repos',
      Authorization: process.env.GITHUB_TOKEN,
    },
  };

  // Make request
  request(options, function (err, response, body) {
    if (err) {
      console.log('Error received:', err);
    }
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

  // Loop over each contributor for repo
  result.forEach(function (user) {
    var starredURL = user.starred_url.replace('{/owner}{/repo}', '');
    console.log(starredURL);
    getStarredRepos(starredURL);
  });

setTimeout(function(){ console.log(counter); }, 5000);
});

// GET STARRED REPOS
function getStarredRepos(url, callback) {

  // Set options for request
  var options = {
    url: url,
    headers: {
      'User-Agent': 'recommend_repos',
      Authorization: process.env.GITHUB_TOKEN,
    },
  };

  // Make request
  request(options, function (err, response, body) {

    var parsed = JSON.parse(body);
    for (var each in parsed){
      var fullName = parsed[each].full_name;
      if (!counter[fullName]) {
        counter[fullName] = 1;
      } else {
        counter[fullName] = counter[fullName] + 1;
      }
    }
  });
}
