//variable for the images with clickable class
var navclickel = document.querySelectorAll(".clickable")
var comicres = document.querySelector("#Comicres")
var movieres = document.querySelector("#Movieres")
var moviearray = ["Spider-Man","Guardians of the Galaxy","Iron Man","Thor","Hulk"]
var theFavArea = document.querySelector("#favorites")

// Calling the fav appender so the fav section loads right away
appendFavs()

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
          img.setAttribute("class","favoritable")
          img.setAttribute("class", "image_re-size");
          img.addEventListener("click", moveToFavsStorage)
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
          img.setAttribute("class","favoritable")
          img.setAttribute("class", "image_re-size");
          img.addEventListener("click", moveToFavsStorage)
          comicres.append(img);

          // Remove the selected comic from the array to avoid duplicates
          comicsWithImages.splice(randomIndex, 1);
        }
      }
    });
}
// Moving Image to Favorite Storage
function moveToFavsStorage() {
 var clickedImage = this.src
 var FavLocalStorage = JSON.parse(localStorage.getItem("FavLocalStorage")) || []
 console.log(FavLocalStorage.length)

 // Checking if the array has anything in it, because if not, we will just add it to the array
 if(FavLocalStorage.length == 0)
    {
      //If the array is empty, pushes and saves
      FavLocalStorage.push(clickedImage);
      localStorage.setItem("FavLocalStorage", JSON.stringify(FavLocalStorage))
    }
    //What if there is something in the array? Then we will check for similar saves
    else
    {
      for( var i = 0; i < FavLocalStorage.length; i++)
     {
        // If there is a similar save, in that the array item is equal to the clicked image item,
        // End the if statement and do not add to the array
        if(FavLocalStorage[i] == clickedImage)
        { 
         return;
        }
        // Question is: why does -1 in the else if statement work, and how? 
        // What does it have to do with the array length and index values
        // Looks at the 4th index (if 5 was the total of things in the array), 0 1, 2, 3, 4,
        // so when I checks the 4th thing its at the end of the index
        // the index's number will always be 1 less than the length
        else if( i == FavLocalStorage.length-1 && FavLocalStorage[i] != clickedImage)
        {
          //if no repeats it pushes and saves
          FavLocalStorage.push(clickedImage);
          localStorage.setItem("FavLocalStorage", JSON.stringify(FavLocalStorage))
          appendFavs()
        }
      }
    }
    appendFavs() 
}


function appendFavs() {
  // The below line deletes everything currently inside the favorite section
  theFavArea.innerHTML = ""
  // Do we have access to the fav storage in this function, since it was created/stored in another function?
  // Yes because the variable was created and we have access to local storage regardless of scope
  var FavLocalStorage = JSON.parse(localStorage.getItem("FavLocalStorage"))
  console.log("We just grabbed an item from local storage!")
  if (FavLocalStorage == null) {
    return
  }
  else {
    for (var i=0; i<FavLocalStorage.length; i++) {
      console.log("We are creating a new image element!")
      var fav = document.createElement("img")
      fav.setAttribute("src", FavLocalStorage[i])
      fav.setAttribute("index", i)
      fav.setAttribute("class", "image_re-size");
      fav.addEventListener("click", removeFav)
      console.log("We are appending the new image to the favorite section!")
      theFavArea.append(fav)
    }
  }
}

function removeFav(){
  var favImage = this.getAttribute("index")
  var FavLocalStorage = JSON.parse(localStorage.getItem("FavLocalStorage"))
  console.log("We just grabbed an item from local storage!")
  // Removing the item, and just one of it
  FavLocalStorage.splice(favImage, 1)
  localStorage.setItem("FavLocalStorage", JSON.stringify(FavLocalStorage))
  appendFavs()
}

//getComicposter('1009610'); // This will retrieve comics for Spider-Man


//images are grabbed on line 72 and line 110

// Add Hover Effects for Each Image
// decrease the image brightness, and add text to let user know they can click to save


// New function to add the images from the array
// Grab the array from local storage
// Convert it to readable data JSON.parse
// append the readable array items into the favorites section
// loop through the array and append each item to the html
// Done with the function

// every time the page loads, call the local storage retrieval and appending function

// Final Function to remove images from the html Favorite Section
// Click Detector on the image
// On click, run a function to remove the image from the html
// DOM manipulate into the Favorites Section of the target, and remove the image
// 

