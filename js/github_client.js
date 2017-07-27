var github_url = "https://api.github.com/"
var u = "davidtom"
var t = "4c9e819ad719c2f1a142bc5f7512dd693a33c167"

//define functions here
var render = function(template, selector){
  $(selector).empty()
  $(selector).append(template)
}

var createGist = function(file_name, content, description, token){
  var gist = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }
  $.ajax({
    "url": github_url + "gists",
    "type": "POST",
    "datatype": "json",
    "data": JSON.stringify(gist),
    "headers": {
      "Authorization": "token " + token
    },
    success: function(data){myGists(data.owner.login, token)
    },
    error: function(err){console.log(err)}
  })
};

var myGists = function (username, token){
  $.ajax({
    url: github_url+ "users/" + username + "/gists",
    type: "GET",
    datatype: "json",
    headers: {
      Authorization: "token " + token
    },
    // success: function(data){displayGists(data)}, NOTE: moved to then
    error: function(err){console.log(err)}
  }).then(function(data){displayGists(data)})
};

var displayGists = function (gists){
  html = `<ul>${gists.map(function(gist){return '<li><a href=' + gist.html_url + '>' + gist.description + '</a></li>'}).join("")}</ul>`
  debugger
  render(html, "div.gist-details")
}

var bindCreateButton = function() {
  $("form.gist-submit").on("submit", function(event){
    event.preventDefault()
    var token = event.currentTarget[0].value
    var fileName = event.currentTarget[1].value
    var description = event.currentTarget[2].value
    var content = event.currentTarget[3].value
    createGist(fileName, content, description, token)
    $(".gist-input-field").val("")
  })
};

$(document).ready(function(){
  bindCreateButton()
});
