function getMovieList(searchTerm) {
  var requestUrl = 'http://www.omdbapi.com/?apikey=40a1c6b7&s=' + searchTerm;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log("our movie lists is here", data.Search)

      for(var i = 0; i < data.Search.length; i++)
      {
        var id = data.Search[i].imdbID
        getMovieFromImdbId(id);

      }

    });
}
function getcomicList(searchTerm) {
  var apikey = "c28d1b2b7c226d7e5519d7bcd4284701"
  var privkey = "fb776d9a0343edc1503c8e8173ae1b0de30d0e25"
  var ts = "1"
  var passhash = CryptoJS.MD5(ts+privkey+apikey).toString();
  console.log(passhash)
  var requestUrl = `https://gateway.marvel.com:443/v1/public/characters/${searchTerm}/comics?limit=50&ts=${ts}&hash=${passhash}&apikey=${apikey}`;
  //&name=${searchTerm}
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data)


    });

}

function getMovieFromImdbId(imdbId) {
  // fetch request gets a list of all the repos for the node.js organization
  // var requestUrl = 'http://api.rottentomatoes.com/api/public/v1.0/lists.json?apikey=t89rqfstq3kg2tf3fg7svkbh';
  // var requestUrl = 'https://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=t89rqfstq3kg2tf3fg7svkbh';
  var requestUrl = 'http://www.omdbapi.com/?apikey=40a1c6b7&i=' + imdbId;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log("the movie info is here", data)
      data.Year
      //Loop over the data to generate a table, each table row will have a link to the repo url


    });
}

getMovieList('spider-man')
getcomicList('1009610')

