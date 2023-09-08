//variable for the images with clickable class
var navclickel = document.querySelectorAll(".clickable")
var comicres = document.querySelector("#Comicres")
var movieres = document.querySelector("#Movieres")
var moviearray = ["Spider-Man","Guardians of the Galaxy","Iron Man","Thor","Hulk"]

//first gets a movie poster to display on main
mainposterchoice()
//gives the buttons the event listener for on click
for (var i = 0; i < navclickel.length; i++ ){
  navclickel[i].addEventListener("click", getinfo)
}
//chooses random index from moviearray and chooses that to look for a poster with
function mainposterchoice() {
  var randomIndex = Math.floor(Math.random() * moviearray.length);
  console.log(moviearray[randomIndex])
  getmoviemainposter(moviearray[randomIndex])
}
function getinfo()
{
  //gets the id of the button splits it into the comic search and movie search term and clears the results doc
  var searchingterm = this.id;
  var movieterm = searchingterm.split("/")[0]
  var comicterm = searchingterm.split("/")[1]
  comicres.innerHTML = "";
  movieres.innerHTML = "";
  getmovieposter(movieterm)
  getComicposter(comicterm)
}


function getmoviemainposter(searchTerm) {
  var requestUrl = 'http://www.omdbapi.com/?apikey=40a1c6b7&s=' + searchTerm;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Check if there are movies in the search results
      if (data.Search && data.Search.length > 0) {
        // Get a random index within the range of the search results array
        var randomIndex = Math.floor(Math.random() * data.Search.length);

        // Use the random index to get the poster URL of a random movie
        var posterUrl = data.Search[randomIndex].Poster;

        // Update the background image using the random movie's poster URL
        document.getElementById('backgimg').src = posterUrl;
      } 
      else 
      {
        console.log("No movies found for the search term: " + searchTerm);
      }
    });
}

function getmovieposter(searchTerm) {
  var requestUrl = 'http://www.omdbapi.com/?apikey=40a1c6b7&s=' + searchTerm;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Check if there are movies in the search results
      for (let i = 0; i < 3; i++){
        if (data.Search.length > 0) 
        {
          var img = document.createElement("img");
          var randomIndex = Math.floor(Math.random() * data.Search.length);
          var posterUrl = data.Search[randomIndex].Poster;
          img.setAttribute("src", posterUrl);
          movieres.append(img);
        } 
        else 
        {
          console.log("No movies found for the search term: " + searchTerm);
        }
      }
    });
}

function getComicposter(searchTerm) {
  var apikey = "c28d1b2b7c226d7e5519d7bcd4284701"
  var privkey = "fb776d9a0343edc1503c8e8173ae1b0de30d0e25"
  var ts = "1"
  var passhash = CryptoJS.MD5(ts+privkey+apikey).toString();

  var requestUrl = `https://gateway.marvel.com:443/v1/public/characters/${searchTerm}/comics?limit=20&ts=${ts}&hash=${passhash}&apikey=${apikey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //shows the data of the comics that character is in
      const comics = data.data.results;

      // Filter out comics that don't have images
      const comicsWithImages = comics.filter((comic) => {
        return comic.images.length > 0;
      });

      // Display a random selection of comics with images
      for (let i = 0; i < 3; i++) {
        if (comicsWithImages.length > 0) {
          const img = document.createElement("img");
          const randomIndex = Math.floor(Math.random() * comicsWithImages.length);
          const imagePath = comicsWithImages[randomIndex].images[0].path;
          img.setAttribute("src", `${imagePath}.jpg`);
          comicres.append(img);

          // Remove the selected comic from the array to avoid duplicates
          comicsWithImages.splice(randomIndex, 1);
        }
      }
    });
}
//getComicposter('1009610'); // This will retrieve comics for Spider-Man
