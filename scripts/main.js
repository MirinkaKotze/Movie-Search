// LESSON 33 - AJAX
// MOVIE SEARCH -- TASK:
// Execute a web page for movie search.
// When opening the page
// - a user can only see an input form for putting in the name (or part of the name)
// - and choosing the type (movie, series, episode).

// After the user puts in the data and clicks Search,
// it is necessary to send a corresponding query to an
// API resource OMDB (http://www.omdbapi.com/) using AJAX.

// If you receive a list of movies as a response,
// it should be displayed below the search form.
// - If there is no match for given parameters, display Movie not found!.

// Note that OMDB only returns 10 movies by default.
// This is why you should execute pagination in case there are more than 10 movies.
// Pagination is the numeration of pages which is usually located at the top or bottom of a web page.
// You’ve probably seen numbers 1, 2, 3 etc on online store web pages with products.
// Clicking those numbers displays different blocks of products. This is pagination.
// So the first search should return the first 10 movies and a button for moving in between pages.
// Clicking this button should send a query with needed page in parameters, and the
// received answer should be displayed instead of the current movie list.

// There should be a Details button next to each movie.
// Clicking it should display detailed information about the movie.
// This information should be put out on the same page under the movie list and pagination.

// All the queries need to be sent using AJAX.
// So clicking any button should not refresh the page.
// API OMDB link: http://www.omdbapi.com/ (register to get an API KEY).
// Extra API link with movies (in case OMDB doesn’t work): https://developers.themoviedb.org/3/search/search-movies.

// POINTERS
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitButton");
const favouritesContainer = document.getElementById("favouritesContainer");
const favouritesAlreadySavedContainer = document.getElementById(
  "favouritesAlreadySavedContainer"
);
const movieContainer = document.getElementById("movieContainer");
const movieDetailsContainer = document.getElementById("movieDetailsContainer");

// GLOBAL PAGE COUNTER, TO CHANGE PAGES
let currentPage = 1;

// -- CREATE AND LOAD MOVIES --
// CREATE URL BASED ON SEARCH INPUT
function createURL() {
  currentPage = 1; // reset current page global page counter with new search
  const movieInputTitle = searchInput.value;
  const movieInputType = searchType.value;
  // ? API KEY -- AIzaSyDNsSFGxw-9GC49fm4-MIsM2mGLJ3146rk --> WORKING AT GOOGLE MAP, BUT NOT HERE? http://www.omdbapi.com/?apikey=[yourkey]&
  const inputURL = `https://www.omdbapi.com/?apikey=afd82b43&s=${movieInputTitle}&type=${movieInputType}&plot=short`;
  fetchData(inputURL, loadAndCreateCards); // Insert URL and loadAndCreateCards into AJAX request function
}

// AJAX SEARCH REQUEST --> GETTING INFO FROM API AND SENDING IT TO loadAndCreateCards FUNCTION
function fetchData(url, output) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      output(data);
    });
}

// SEND AJAX INFO INTO MOVIE CONTAINER FUNCTION + UPDATING DOM
function loadAndCreateCards(info) {
  if (movieContainer.firstChild) {
    removeMovies();
    removeMovieDetails();
  }

  if (info["Response"] == "False") {
    // no movies in search --> call function to display no movies message.
    noMoviesFound();
  }

  const movieInstructions = document.createElement("h4");
  movieInstructions.classList.add("movie__header--instructions");
  movieInstructions.innerText =
    "Click on the movie card to show the movie details at the bottom...";

  const cards = createCardsContainer(info["Search"]); // sending all the data throught the createCardsContainer function

  movieContainer.appendChild(movieInstructions); // add movie info to HTML
  movieContainer.appendChild(cards); // add all cards to HTML

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("movie__page-button--container");

  const previousPageButton = document.createElement("button");
  previousPageButton.classList.add("movie__page-button--previous");
  previousPageButton.innerText = "PREVIOUS";
  previousPageButton.addEventListener("click", function () {
    //  function calling previous page
    const previous = "previous";
    changePage(previous);
  });

  const nextPageButton = document.createElement("button");
  nextPageButton.classList.add("movie__page-button--next");
  nextPageButton.innerText = "NEXT";
  nextPageButton.addEventListener("click", function () {
    // function returning the clicked title and year
    const next = "next";
    changePage(next);
  });

  buttonContainer.appendChild(previousPageButton);
  buttonContainer.appendChild(nextPageButton);

  movieContainer.appendChild(buttonContainer);
}

// REMOVE CURRENT MOVIES
function removeMovies() {
  movieContainer.innerHTML = "";
  movieContainer.className = "";
}

// NO MOVIES FOUND MESSAGE
function noMoviesFound() {
  const errorMessageWrapper = document.createElement("div");
  errorMessageWrapper.classList.add("error-message__container");

  const errorMessageTitle = document.createElement("h2");
  errorMessageTitle.classList.add("error-message__text");
  errorMessageTitle.innerText =
    "No movies found for your search. Please try again!";

  errorMessageWrapper.appendChild(errorMessageTitle);
  movieContainer.appendChild(errorMessageWrapper);
}

// CREATE MOVIE CONTAINER
function createCardsContainer(movieList) {
  const cardsContainer = document.createElement("main");
  cardsContainer.classList.add("card__container");

  for (let movie of movieList) {
    // for every movie in the movie list
    const newMovieCard = createMovieCard(movie); // send a movie-info into createMovieCard function
    cardsContainer.appendChild(newMovieCard); // and add these movie cards to the container
  }

  return cardsContainer;
}

// CREATE MOVIE CARD
function createMovieCard(movie) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card__wrapper");

  const moviePoster = document.createElement("img");
  moviePoster.classList.add("card__image");
  moviePoster.setAttribute("src", movie["Poster"]);
  moviePoster.setAttribute("alt", movie["Title"]);

  const cardTextWrapper = document.createElement("div");
  cardTextWrapper.classList.add("card__text-container");

  const movieTitle = document.createElement("h4");
  movieTitle.innerText = movie["Title"];

  const movieYear = document.createElement("p");
  movieYear.innerText = movie["Year"];

  const detailsButton = document.createElement("button");
  detailsButton.classList.add("card__details--button");
  detailsButton.innerText = "More Details";
  detailsButton.addEventListener("click", function () {
    //function returning the clicked title and year
    createDetailsURL(movie["Title"], movie["Year"]);
  });

  cardTextWrapper.appendChild(movieTitle);
  cardTextWrapper.appendChild(movieYear);
  cardTextWrapper.appendChild(detailsButton);

  cardWrapper.appendChild(moviePoster);
  cardWrapper.appendChild(cardTextWrapper);

  return cardWrapper;
}

//-- CREATE AND LOAD NEXT OR PREVIOUS PAGE --
// UPDATING PAGE ARRAY & CALL NEW PAGE
function changePage(change) {
  if (change === "previous" && currentPage === 1) {
    // if current page = 1 {can't go to previous page}
    return;
  }

  if (change === "previous" && currentPage > 1) {
    const previousPage = currentPage - 1;
    createPageURL(previousPage);
    currentPage = previousPage; // update global counter
  }

  if (change === "next") {
    const nextPage = currentPage + 1;
    createPageURL(nextPage);
    currentPage = nextPage; // update global counter
  }
}

// NEW URL FOR NEXT / PREVIOUS PAGE ON BUTTON CLICK
function createPageURL(pageNumber) {
  const movieInputTitle = searchInput.value;
  const movieInputType = searchType.value;
  const pageURL = `https://www.omdbapi.com/?apikey=afd82b43&s=${movieInputTitle}&type=${movieInputType}&plot=short&page=${pageNumber}`;
  fetchData(pageURL, loadAndCreateCards); // Insert URL and loadAndCreateCards into AJAX request function
}

// -- CREATE AND LOAD MOVIE DETAILS --
// CREATE URL BASED ON CARD SELECTED
function createDetailsURL(title, year) {
  // title and year of the card clicked
  const detailsURL = `https://www.omdbapi.com/?apikey=afd82b43&t=${title}&y=${year}&plot=short`; // new URL for the details
  fetchDetails(detailsURL, showMovieDetails); // Insert URL and  createDetailMovieCard into AJAX request function
}

// AJAX SEARCH REQUEST --> GETTING INFO FROM API AND SENDING IT TO showDetailMovie FUNCTION
function fetchDetails(url, output) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      output(data);
    });
}

// MOVIE DISCRIPTION CONTAINER + HEADER
function showMovieDetails(movie) {
  if (movieDetailsContainer.firstChild) {
    removeMovieDetails();
  }

  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("details__wrapper");

  const detailsHeader = document.createElement("h2");
  detailsHeader.classList.add("details__header");
  detailsHeader.innerHTML = "Movie description...";

  const detail = createMovieDetailsCard(movie);

  detailsWrapper.appendChild(detailsHeader);
  detailsWrapper.appendChild(detail);

  const favouriteButtonContainer = document.createElement("div");
  favouriteButtonContainer.classList.add("favourite__button--container");

  const favouriteButton = document.createElement("button");
  favouriteButton.classList.add("favourite__button");
  favouriteButton.innerText = "ADD TO FAVOURITES";
  favouriteButton.addEventListener("click", function () {
    //  function adding to favourites
    saveFavouriteMovie(movie["Title"]);
  });

  favouriteButtonContainer.appendChild(favouriteButton);

  movieDetailsContainer.appendChild(detailsWrapper);
  movieDetailsContainer.appendChild(favouriteButtonContainer);
}

// MOVIE DESCRIPTION CARDS
function createMovieDetailsCard(movie) {
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details__container");

  const detailsPoster = document.createElement("img");
  detailsPoster.classList.add("details__image");
  detailsPoster.setAttribute("src", movie["Poster"]);
  detailsPoster.setAttribute("alt", movie["Title"]);

  const detailsTextWrapper = document.createElement("div");
  detailsTextWrapper.classList.add("details__text-container");

  const detailsTitle = document.createElement("h4");
  detailsTitle.innerText = `Title: ${movie["Title"]}`;

  const detailsReleased = document.createElement("p");
  detailsReleased.innerText = `Released: ${movie["Released"]}`;

  const detailsGenre = document.createElement("p");
  detailsGenre.innerText = `Genre: ${movie["Genre"]}`;

  const detailsRuntime = document.createElement("p");
  detailsRuntime.innerText = `Runtime: ${movie["Runtime"]}`;

  const detailsCountry = document.createElement("p");
  detailsCountry.innerText = `Country: ${movie["Country"]}`;

  const detailsLanguage = document.createElement("p");
  detailsLanguage.innerText = `Language: ${movie["Language"]}`;

  const detailsActors = document.createElement("p");
  detailsActors.innerText = `Actors: ${movie["Actors"]}`;

  const detailsPlot = document.createElement("p");
  detailsPlot.innerText = `Plot: ${movie["Plot"]}`;

  const detailsAwards = document.createElement("p");
  detailsAwards.innerText = `Awards: ${movie["Awards"]}`;

  detailsTextWrapper.appendChild(detailsTitle);
  detailsTextWrapper.appendChild(detailsReleased);
  detailsTextWrapper.appendChild(detailsGenre);
  detailsTextWrapper.appendChild(detailsRuntime);
  detailsTextWrapper.appendChild(detailsCountry);
  detailsTextWrapper.appendChild(detailsLanguage);
  detailsTextWrapper.appendChild(detailsActors);
  detailsTextWrapper.appendChild(detailsPlot);
  detailsTextWrapper.appendChild(detailsAwards);

  detailsContainer.appendChild(detailsPoster);
  detailsContainer.appendChild(detailsTextWrapper);

  return detailsContainer;
}

// REMOVE CURRENT MOVIE DETAILS
function removeMovieDetails() {
  movieDetailsContainer.innerHTML = "";
  movieDetailsContainer.className = "";
}

//-- ADDING FAVOURITES --
// ADDM FAVOURITE BLOCK AT LOAD IF FAVOURITES IS STORED
function checkFavouritesOnLoad() {
  if (localStorage.getItem("favouriteMovie").length > 2) {
    favouriteListContainer();
  }
}

// ADD FAVOURITE MOVIE TO LOCAL STORAGE
function saveFavouriteMovie(favouriteMovieTitle) {
  let favourites = [];
  if (localStorage.getItem("favouriteMovie") != null) {
    // if no items in local storage, don't get
    const previousSaved = JSON.parse(localStorage.favouriteMovie); // ['aaa']
    previousSaved.forEach((item) => {
      // remove elements from array and push into new array
      favourites.push(item);
    });

    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i] === favouriteMovieTitle) {
        debugger; // if user wants to save same favourite twice
        alreadySaved(favourites[i]);
        return;
      }
    }
  }
  const newFavourite = favourites.push(favouriteMovieTitle);
  localStorage.setItem("favouriteMovie", JSON.stringify(favourites));
  favouriteListContainer(); // call function to create container
}

// TRYING TO SAVE SAME FAVOURITE TWICE
function alreadySaved(movieTitle) {
  const alreadySavedWrapper = document.createElement("div");
  alreadySavedWrapper.classList.add("favourite__already-saved-msg--container");
  const alreadySavedTitle = document.createElement("h2");
  alreadySavedTitle.classList.add("favourite__already-saved-msg--text");
  alreadySavedTitle.innerText = `The movie: ${movieTitle} is already added to your favourites!`;

  alreadySavedWrapper.appendChild(alreadySavedTitle);
  favouritesAlreadySavedContainer.appendChild(alreadySavedWrapper);
  setTimeout(() => {
    favouritesAlreadySavedContainer.innerHTML = "";
  }, 5000); // remove alreadySaved msg after 5sec
}

function removeAlreadySavedMsg() {
  favouritesAlreadySavedContainer.innerHTML = "";
}

// ADDING FAVOURITE LIST
function favouriteListContainer() {
  if (favouritesContainer.firstChild) {
    // if already favourites - remove to add new block
    favouritesContainer.innerHTML = "";
  }

  const favouriteWrapper = document.createElement("div");
  favouriteWrapper.classList.add("favourite__wrapper");

  const favouriteTitle = document.createElement("h4");
  favouriteTitle.classList.add("favourite__title");
  favouriteTitle.innerText = "FAVOURITES:";

  const favouriteList = createFavouriteList(); // call function to get info from local storage

  favouriteWrapper.appendChild(favouriteTitle);
  favouriteWrapper.appendChild(favouriteList);

  favouritesContainer.appendChild(favouriteWrapper);
}

// CREATE FAVOURITE LIST ITEMS
function createFavouriteList() {
  const favouriteList = document.createElement("ul");
  favouriteList.classList.add("favourite__list");

  const favouriteSaved = JSON.parse(localStorage.favouriteMovie); // get info from local storage

  for (let i = 0; i < favouriteSaved.length; i++) {
    // add info to list
    const favouriteListItem = document.createElement("li");
    favouriteListItem.classList.add("favourite__list--item");

    const removeItemButton = document.createElement("button");
    removeItemButton.classList.add("favourite__list--remove-button");
    removeItemButton.innerText = "X";
    removeItemButton.addEventListener("click", function () {
      // remove from favourites
      removingFavouriteMovieFromList(favouriteSaved[i]);
    });

    favouriteListItem.appendChild(removeItemButton);
    favouriteListItem.appendChild(document.createTextNode(favouriteSaved[i]));

    favouriteList.appendChild(favouriteListItem);
  }
  return favouriteList;
}

// REMOVING ITEMS FROM FAVOURITE LIST
function removingFavouriteMovieFromList(removeMovieTitle) {
  const savedBreeds = JSON.parse(localStorage.favouriteMovie);

  for (let i = 0; i < savedBreeds.length; i++) {
    if (savedBreeds[i] === removeMovieTitle) {
      savedBreeds.splice([i], 1);
      localStorage.setItem("favouriteMovie", JSON.stringify(savedBreeds));
    }
  }
  favouriteListContainer();
}

// <-- PAGE START -->
window.addEventListener("DOMContentLoaded", checkFavouritesOnLoad);
// --- CALLING FUNCTION WHEN SUBMIT CLICKED -- >
// START MOVIE SEARCH
submitButton.addEventListener("click", createURL);

// WEBSITE RESOURCES
// http://www.omdbapi.com/
// https://digitalredneck.co.uk/using-the-omdb-imdb-api-to-create-an-application-using-node-js/
// https://osp123.github.io/tutorials/html/omdb.html --> API KEY: afd82b43
