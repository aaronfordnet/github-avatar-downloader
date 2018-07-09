var request = require('request');
var fs = require('fs');
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


function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466%22,%20%22avatars/kvirani.jpg', './downloads/avatar.jpg')
