var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
    'User-Agent': 'aaronfordnet',
    Authorization: secrets.GITHUB_TOKEN
    }
  }


  request(options, function(err, response, body) {
    // Parse string received from Github into JSON, and pass it into callback function
    var parsed = JSON.parse(body);
    callback(err, parsed)
  })
}


getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) {
    console.log("Error received:", err);
  }
  // Loop over each item in parsed data from Github
  result.forEach(function(user) {
    console.log(user.avatar_url);
  })
});
