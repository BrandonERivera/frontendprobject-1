//variable for the images with clickable class
var navclickel = document.querySelectorAll(".clickable")
//gets the movie list by searchterm
function getMovieList(searchTerm) {
  var requestUrl = 'http://www.omdbapi.com/?apikey=40a1c6b7&s=' + searchTerm;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      //data and object that has the search, total results and if it responded
      //we want data.search to specifically get the movie list
      console.log("our movie lists is here", data.search)
      //this is running the function equal to the number of movies to get the data based on its id
      for(var i = 0; i < data.Search.length; i++)
      {
        var id = data.Search[i].imdbID
        getMovieFromImdbId(id);

      }

    });
}
//get the comic list by searchterm
const comicres = document.querySelector("#Comicres")
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
      //shows the data of the comics that character is in
      console.log("-------------------------")
      console.log(data)
      for(let i = 0; i < 3; i++) {
        const img = document.createElement("img")
        var randomIndex = Math.floor(Math.random() * data.length)
        const imagePath = data.data.results[randomIndex].images[0].path
        if(imagePath.length > 0) {   
          img.setAttribute("src", data.data.results[randomIndex].images[0].path + ".jpg")
          comicres.append(img)
        } else {
          img.setAttribute("src", data.data.results[i + 1].images[0].path + ".jpg")
          comicres.append(img)
        }
      }
    });

}

function getMovieFromImdbId(imdbId) {
  
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
//this grabs every image thats class clickable and gives them an onclickevent
for (var i = 0; i < navclickel.length; i++ ){
  navclickel[i].addEventListener("click", getinfo)
}
//this function is where the getmovie and get comic listing will go
function getinfo()
{
  console.log(this.id)
}
//variable instead the name to search by
//if we are doing pre-designated names we need to have the buttons give the function the variable instead of "spider-man"
//getMovieList('spider-man')
//for comics it needs the id of the character
getcomicList('1009610')
