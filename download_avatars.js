var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    //url: 'https://api.github.com/repos/' + repoOwner + repoName + '/contributors',
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
    'User-Agent': 'aaronfordnet',
    Authorization: secrets.GITHUB_TOKEN
    }
  }

  request(options, function(err, response, body) {
    callback(err, body)
  })
}


getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) {
    console.log("Error received:", err);
  }
  console.log("Result:", result);
});
